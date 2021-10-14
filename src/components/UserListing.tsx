import React, { useState } from 'react'
import AdminService from '../services/AdminService';

const UserListing = (props: any) => {

    const {setDeleteMessage} = props;

    const [edit, setEdit] = useState(false);
    const [email, setEmail] = useState(props.email);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [roles, setRoles] = useState(props.roles);

    const deleteUser: any = async (id: number) => {
        console.log(id)
        await AdminService.deleteUser(id);
        setDeleteMessage("User with id: " + id + " has been deleted.")
    }

    const updateUserDetails: any = (id: number, email: any, firstName: any, lastName: any, roles: any) => {
        AdminService.updateUser(id, email, firstName, lastName, roles);
    }

    return (
        <div className="mx-10 grid grid-cols-11 gap-x-6">
            <button className="px-2 rounded-lg bg-red-standard text-white-standard text-center" onClick={() => { deleteUser(props.id) }}>X</button>
            <div>{props.id}</div>
            {(edit ? <>
                <input className=" border pl-2 rounded col-span-3 focus:outline-none" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                <input className=" border pl-2 rounded col-span-1 focus:outline-none" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} />
                <input className=" border pl-2 rounded col-span-1 focus:outline-none" onChange={(e) => { setLastName(e.target.value) }} value={lastName} />
                <input className=" border pl-2 rounded col-span-2 focus:outline-none" onChange={(e) => { setRoles(e.target.value) }} value={roles} />
                <button className=" border px-2 rounded bg-green-standard text-white-standard hover:shadow text-center"
                    onClick={() => {
                        updateUserDetails(props.id, email, firstName, lastName, roles)
                        setEdit(false);
                    }}>Confirm</button>
                <button className=" border px-2 rounded bg-yellow-standard hover:shadow text-center"
                    onClick={() => {
                        setEmail(props.email);
                        setFirstName(props.firstName);
                        setLastName(props.lastName);
                        setRoles(props.roles)
                        setEdit(false)
                    }}
                >Undo</button>
            </>
                : <>
                    <p className="col-span-3">{email}</p>
                    <p className="col-span-1">{firstName}</p>
                    <p className="col-span-1"> {lastName}</p>
                    <p className="col-span-2">{roles}</p>
                    <button className="border px-2 rounded-lg bg-green-standard text-white-standard text-center hover:shadow"
                        onClick={() => setEdit(true)}>Edit</button>
                </>)}

        </div>
    )
}

export default UserListing
