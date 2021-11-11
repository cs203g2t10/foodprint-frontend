import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import AdminService from '../services/AdminService';

Modal.setAppElement('#root')

const CreateUserModal = (
    props: any
) => {
    const { createUser, setCreateUser } = props;
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");
    const [roles, setRoles] = useState("");
    const [created, setCreated] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [regexp] = useState("(?=^.{8,}$)(?=.*\\d)(?=.*[a-zA-Z])(?!.*\\s)[0-9a-zA-Z*$-+?_&=!%{}/'.]*$");

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const validateForm = (password: string) => {
        if (password.length < 8 || password.length > 60) {
            setError("Password size must be between 8 and 60");
            return false;
        }
        if (password.length === 0 || !password.match(regexp)) {
            setError("Password must have 1 letter, 1 number and at least 8 characters");
            return false;
        }
        return true;
    }

    const createNewUser = (email: string, firstName: string, lastName: string, password: string, roles: string) => {
        setLoading(true);
        if (!validateForm(password)) {
            setLoading(false);
            return;
        }
        const response = AdminService.adminCreateUser(email, firstName, lastName, password, roles);
        response.then(res => {
            console.log(res)
            if (res.status === 201) {
                console.log("Successful Creation");
                console.log(res.data);
                setCreated(true)
                setError("")
                setLoading(false);
            }
        })
    }

    return (
        <Modal style={customStyles} isOpen={createUser} className="flex md:mt-24 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 rounded-lg shadow pb-10 bg-white-dirtyWhite relative mx-auto px-20">
                <button className="absolute top-3 right-3 " onClick={() => setCreateUser(false)}> <AiOutlineClose className="h-5 w-5" /> </button>
                <h1 className=" flex text-5xl pt-10 text-green-standard font-bold mx-auto">Create User</h1>
                <h1 className=" flex text-base mb-2 text-grey-standard font-light mx-auto">Please fill up all details below </h1>
                <div className="grid gap-y-5 md:grid-cols-2 md:mt-10 gap-x-10">
                    <div className="md:flex gap-x-2 justify-between">
                        <div>Email: </div>
                        <input type="email" className="focus:outline-none px-4 py-1 rounded-large shadow-sm" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                    </div>
                    <div className="md:flex gap-x-2 justify-between">
                        <div>Password: </div>
                        <input type="password" className="focus:outline-none px-4 py-1 rounded-large shadow-sm" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                    </div>
                    <div className="md:flex gap-x-2 justify-between">
                        <div>First Name: </div>
                        <input className="focus:outline-none px-4 py-1 rounded-large shadow-sm" value={firstName} onChange={(e) => { setFirstName(e.target.value) }}></input>
                    </div>
                    <div className="md:flex gap-x-2 justify-between">
                        <div>Last Name: </div>
                        <input className="focus:outline-none px-4 py-1 rounded-large shadow-sm" value={lastName} onChange={(e) => { setLastName(e.target.value) }}></input>
                    </div>
                    <div className="md:flex gap-x-2 justify-between">
                        <div>Role: </div>
                        <input className="focus:outline-none px-4 py-1 rounded-large shadow-sm" value={roles} onChange={(e) => { setRoles(e.target.value) }}></input>
                    </div>
                </div>

                {
                    (error ? <div className="mx-auto pt-3 pb-3 text-red-standard">{error}</div> : <></>)
                }
                {
                    (created ?
                        <>
                            <div className="mx-auto pt-3 pb-3 text-green-standard text-base">User has been successfully created!</div>
                            <div className="pt-2 pb-0 grid grid-cols-2 gap-x-10 justify-center mx-28">
                                <button className=" text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                    onClick={() => {
                                        setCreated(false);
                                        setEmail("");
                                        setPassword("");
                                        setFirstName("");
                                        setLastName("");
                                        setRoles("");
                                    }}>Reset</button>
                                <button className=" text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg border"
                                    onClick={() => { setCreateUser(false) }}>Return</button>
                            </div>
                        </> :
                        <div className="pt-2 pb-0 grid grid-cols-2 gap-x-10 md:justify-center md:mx-28 gap-y-2">
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-sm hover:shadow-md"
                                onClick={() => createNewUser(email, firstName, lastName, password, roles)}>
                                <span>
                                    {
                                        loading ?
                                            <div className="spinner" id="spinner" />
                                            : 'Confirm'
                                    }
                                </span>
                            </button>
                            <button className="text-green-standard px-3 py-1 rounded-xl shadow-sm hover:shadow-md border border-green-standard" onClick={() => setCreateUser(false)}>Cancel</button>
                        </div>)
                }
            </div>

        </Modal>
    )
}

export default CreateUserModal
