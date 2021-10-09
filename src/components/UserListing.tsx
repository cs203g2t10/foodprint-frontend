import React, { useState } from 'react'
import AdminService from '../services/AdminService';

const UserListing = (props: any) => {

    const [edit, setEdit] = useState(false);

    const deleteUser: any = (id: number) => {
        console.log(id)
        AdminService.deleteUser(id);
    }

    return (
        <div className="mx-10 flex gap-x-10">
            {(edit ? <>
                <button className="flex-col border px-2 rounded bg-red-standard text-white-standard" onClick={() => { deleteUser(props.id) }}>Delete</button>
                <p>{props.id}</p>
                {/* <input className="flex-col">{props.email}</input>
                <input>{props.firstName} {props.lastName} </input>
                <input>{props.roles}</input> */}
                <button className="flex-col border px-2 rounded bg-green-standard text-white-standard" onClick={() => {setEdit(false)}}>Confirm changes</button>
            </>
                : <>
                    <button className="flex-col border px-2 rounded bg-red-standard text-white-standard" onClick={() => { deleteUser(props.id) }}>Delete</button>
                    <p>{props.id}</p>
                    <p className="flex-col">{props.email}</p>
                    <p>{props.firstName} {props.lastName} </p>
                    <p>{props.roles}</p>
                    <button className="flex-col border px-2 rounded bg-green-standard text-white-standard" onClick={() => setEdit(true)}>Edit</button>
                </>)}

        </div>
    )
}

export default UserListing
