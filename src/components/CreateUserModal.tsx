import React, { useState } from 'react'
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

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const createNewUser = (email: string, firstName: string, lastName: string, password: string, roles: string) => {
        const response = AdminService.adminCreateUser(email, firstName, lastName, password, roles);
        response.then(res => {
            console.log(res)
            if (res.status === 201) {
                console.log("Successful Creation");
                console.log(res.data);
                setCreated(true)
            }
        })
    }

    return (
        <Modal style={customStyles} isOpen={createUser} className="mt-20 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl pt-12 text-green-standard font-bold mx-auto">Create User</h1>
                <h1 className=" flex text-md mb-2 text-grey-standard font-light mx-auto">Please fill up all details below </h1>
                <div className="grid gap-y-5 grid-cols-2 mt-10 gap-x-10">
                    <div className="flex gap-x-2 justify-between">
                        <div>Email: </div>
                        <input type="email" className="focus:outline-none px-2 rounded" value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Password: </div>
                        <input type="password" className="focus:outline-none px-2 rounded" value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>First Name: </div>
                        <input className="focus:outline-none px-2 rounded" value={firstName} onChange={(e) => { setFirstName(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Last Name: </div>
                        <input className="focus:outline-none px-2 rounded" value={lastName} onChange={(e) => { setLastName(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Role: </div>
                        <input className="focus:outline-none px-2 rounded" value={roles} onChange={(e) => { setRoles(e.target.value) }}></input>
                    </div>
                </div>

                {
                    (created ?
                        <>
                            <div className="mx-auto pt-7 pb-2">User has been successfully created!</div>
                            <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28">
                                <button className=" text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                    onClick={() => {
                                        setCreated(false);
                                        setEmail("");
                                        setPassword("");
                                        setFirstName("");
                                        setLastName("");
                                        setRoles("");
                                    }}>Reset</button>
                                <button className=" text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                    onClick={() => { setCreateUser(false) }}>Return</button>
                            </div>
                        </> :
                        <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28 pt-16">
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                onClick={() => createNewUser(email, firstName, lastName, password, roles)}>Confirm</button>
                            <button className="text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg" onClick={() => setCreateUser(false)}>Cancel</button>
                        </div>)
                }
            </div>

        </Modal>
    )
}

export default CreateUserModal
