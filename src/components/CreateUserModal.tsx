import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import { BeatLoader } from 'react-spinners';
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
        <Modal style={customStyles} isOpen={createUser} className="flex md:mt-4 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 rounded-lg shadow py-6 bg-white-standard mx-auto px-6 relative w-2/6">
                <button className="absolute top-5 right-5 rounded-full hover:bg-grey-lightest shadow-sm p-2 bg-gray-200" onClick={() => setCreateUser(false)}> <AiOutlineClose className="h-5 w-5" /> </button>
                <img className="px-5 h-52 mx-auto" src="/images/invite.png" alt="create" />
                <h1 className="flex text-3xl text-green-standard font-bold px-10 mt-3">Create User</h1>
                <h1 className=" flex text-base text-grey-standard font-light mx-10">Please fill up all details below </h1>
                <div className="grid md:mt-3 gap-y-2 mx-10">
                    <div className="md:flex gap-x-2 justify-between">
                        <div>Email: </div>
                        <input type="email" className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                    </div>
                    <div className="md:flex gap-x-2 justify-between">
                        <div>Password: </div>
                        <input type="password" className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                    </div>
                    <div className="md:flex gap-x-2 justify-between">
                        <div>First Name: </div>
                        <input className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" value={firstName} onChange={(e) => { setFirstName(e.target.value) }}></input>
                    </div>
                    <div className="md:flex gap-x-2 justify-between">
                        <div>Last Name: </div>
                        <input className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" value={lastName} onChange={(e) => { setLastName(e.target.value) }}></input>
                    </div>
                    <div className="md:flex gap-x-2 justify-between">
                        <div>Role: </div>
                        <input className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" value={roles} onChange={(e) => { setRoles(e.target.value) }}></input>
                    </div>
                </div>
                {
                    (error ? <div className="mx-auto text-red-standard">{error}</div> : <></>)
                }
                {
                    (created ?
                        <>
                            <div className="pt-3 text-green-standard text-base px-10">User has been successfully created!</div>
                            <div className="pt-2 grid grid-cols-2 gap-x-6 justify-center mx-10">
                                <button className=" text-white-standard bg-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg w-full"
                                    onClick={() => {
                                        setCreated(false);
                                        setEmail("");
                                        setPassword("");
                                        setFirstName("");
                                        setLastName("");
                                        setRoles("");
                                    }}>Reset</button>
                                <button className=" text-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg border w-full border-green-standard"
                                    onClick={() => { setCreateUser(false); window.location.reload(); }}>Return</button>
                            </div>
                        </> :
                        <div className="pt-2 pb-0 grid grid-cols-2 gap-x-6 md:justify-center px-10 gap-y-2">
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-lg shadow-sm hover:shadow-md"
                                onClick={() => createNewUser(email, firstName, lastName, password, roles)}>
                                <span>
                                    {
                                        loading ?
                                            <BeatLoader size="9" color="#daeddb" />
                                            : 'Confirm'
                                    }
                                </span>
                            </button>
                            <button className="text-green-standard px-3 py-1 rounded-lg shadow-sm hover:shadow-md border border-green-standard w-full" onClick={() => setCreateUser(false)}>Cancel</button>
                        </div>)
                }
            </div>

        </Modal>
    )
}

export default CreateUserModal
