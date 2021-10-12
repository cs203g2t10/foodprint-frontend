import React, { useState } from 'react'
import AdminService from '../services/AdminService';

const UserListing = (props: any) => {

    const [edit, setEdit] = useState(false);
    const [email, setEmail] = useState(props.email);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [roles, setRoles] = useState(props.roles);

    const deleteUser: any = (id: number) => {
        console.log(id)
        AdminService.deleteUser(id);
    }

    const updateUserDetails:any = (id:number, email:any, firstName:any, lastName:any, roles:any) => {
        AdminService.updateUser(id, email,firstName,lastName,roles);
    }



    return (
        <div className="mx-10 flex gap-x-10">
            <button className="flex-col border px-2 rounded bg-red-standard text-white-standard" onClick={() => { deleteUser(props.id) }}>X</button>
            {(edit ? <>
                {/* <button className="flex-col border px-2 rounded bg-red-standard text-white-standard" onClick={() => { deleteUser(props.id) }}>Delete</button> */}
                <p>{props.id}</p>
                <input className="flex-col border pl-2 rounded" onChange={(e)=>{setEmail(e.target.value)}} placeholder={email}/>
                <input className="flex-col border pl-2 rounded" onChange={(e)=>{setFirstName(e.target.value)}} placeholder={firstName}/>
                <input className="flex-col border pl-2 rounded" onChange={(e)=>{setLastName(e.target.value)}} placeholder={lastName}/>
                <input className="flex-col border pl-2 rounded" onChange={(e)=>{setRoles(e.target.value)}} placeholder={roles}/>
                <button className="flex-col border px-2 rounded bg-green-standard text-white-standard hover:shadow" 
                onClick={() => {
                    updateUserDetails(props.id, email,firstName,lastName,roles)
                    setEdit(false);
                    }}>Confirm changes</button>
                <button className="flex-col border px-2 rounded bg-yellow-standard hover:shadow" 
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
                    {/* <button className="flex-col border px-2 rounded bg-red-standard text-white-standard" onClick={() => { deleteUser(props.id) }}>X</button> */}
                    <div>{props.id}</div>
                    <p className="flex-col">{email}</p>
                    <p>{firstName} {lastName} </p>
                    <p>{roles}</p>
                    <button className="flex-col border px-2 rounded bg-green-standard text-white-standard hover:shadow" onClick={() => setEdit(true)}>Edit</button>
                </>)}

        </div>
    )
}

export default UserListing
