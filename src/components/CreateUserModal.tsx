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
        <Modal style={customStyles} isOpen={createUser} className="mt-20">
            <div className="grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl pt-12 text-green-standard mx-20 font-bold mx-auto">Create User</h1>
                <h1 className=" flex text-md mx-20 mb-2 text-grey-standard font-light mx-auto">Please fill up all details below </h1>
                <div className="grid justify-start gap-y-5 grid-cols-2">
                    <div className="flex gap-x-2">
                        <div>Email: </div>
                        <input className="focus:outline-none px-2 rounded" onChange={(e) => { setEmail(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2">
                        <div>Password: </div>
                        <input className="focus:outline-none px-2 rounded" onChange={(e) => { setPassword(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2">
                        <div>First Name: </div>
                        <input className="focus:outline-none px-2 rounded" onChange={(e) => { setFirstName(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2">
                        <div>Last Name: </div>
                        <input className="focus:outline-none px-2 rounded" onChange={(e) => { setLastName(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-4 ">
                        <div>Role: </div>
                        <input className="focus:outline-none px-2 rounded" onChange={(e) => { setRoles(e.target.value) }}></input>
                    </div>
                </div>


                <div className="flex grid grid-cols-2 gap-x-10 mr-2 mt-2 justify-center">
                    <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                        onClick={() => createNewUser(email, firstName, lastName, password, roles)}>Confirm</button>
                    <button className="text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg" onClick={() => setCreateUser(false)}>Cancel</button>
                </div>

                {
                    (created ? <div className="flex grid grid-cols-2 gap-x-10 mr-2 justify-center">
                        New user successfully created!
                    </div> : <></>)
                }
            </div>

        </Modal>
    )
}

export default CreateUserModal
