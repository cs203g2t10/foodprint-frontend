import React, { useState } from 'react'
import AdminService from '../services/AdminService';
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import DeleteModal from './DeleteModal';

const UserListing = (props: any) => {

    const {setDeleteMessage} = props;

    const [edit, setEdit] = useState(false);
    const [email, setEmail] = useState(props.email);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [roles, setRoles] = useState(props.roles);
    const [deleteModal, setDeleteModal] = useState(false);

    const deleteUser: any = async (id: number) => {
        console.log(id)
        await AdminService.deleteUser(id);
        setDeleteMessage("User with id: " + id + " has been deleted.")
        setDeleteModal(false);
    }

    const updateUserDetails: any = (id: number, email: any, firstName: any, lastName: any, roles: any) => {
        AdminService.updateUser(id, email, firstName, lastName, roles);
    }

    return (
        <>
        <div className="mx-8 grid grid-cols-11 gap-x-6">
            <button className="px-2 rounded-full w-8 h-8 bg-opacity-80 hover:bg-opacity-100 bg-red-standard text-white-standard text-center" onClick={() => { setDeleteModal(true) }}><AiOutlineClose/></button>
            <div className="text-grey-standard">{props.id}</div>
            {(edit ? <>
                <input className=" border px-2 shadow-sm rounded-large col-span-3 focus:outline-none text-sm text-grey-standard" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                <input className=" border px-2 shadow-sm rounded-large col-span-1 focus:outline-none text-sm text-grey-standard" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} />
                <input className=" border px-2 shadow-sm rounded-large col-span-1 focus:outline-none text-sm text-grey-standard" onChange={(e) => { setLastName(e.target.value) }} value={lastName} />
                <input className=" border px-2 shadow-sm rounded-large col-span-2 focus:outline-none text-sm text-grey-standard" onChange={(e) => { setRoles(e.target.value) }} value={roles} />
                <button className=" border px-2 rounded-large bg-green-standard text-white-standard hover:shadow text-center text-sm"
                    onClick={() => {
                        updateUserDetails(props.id, email, firstName, lastName, roles)
                        setEdit(false);
                    }}>Confirm</button>
                <button className="shadow-sm hover:shadow-md px-2 rounded-large bg-opacity-60 hover:bg-opacity-100 bg-yellow-standard text-green-standard text-center"
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
                    <p className="col-span-3 text-grey-standard text-base">{email}</p>
                    <p className="col-span-1 text-grey-standard text-base">{firstName}</p>
                    <p className="col-span-1 text-grey-standard text-base"> {lastName}</p>
                    <p className="col-span-3 text-grey-standard text-base">
                        {
                            roles.replace("FP_MANAGER", "Manager").replace("FP_ADMIN", "Admin").replace("FP_USER", "User").replace(/[\,]/g, ", ")
                        }   
                    </p>
                    <button className="shadow-sm hover:shadow-md px-2 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                        onClick={() => setEdit(true)}><AiOutlineEdit/></button>
                </>)}

        </div>
        <DeleteModal {...{deleteModal, setDeleteModal, deleteUser}} userId={props.id} email={email}/>
        </>
    )
}

export default UserListing
