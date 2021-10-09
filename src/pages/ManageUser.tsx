import React, { useEffect, useState } from 'react'
import AdminService from '../services/AdminService';
import UserListing from '../components/UserListing';

const ManageUser = () => {
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        AdminService.getAllUsers().then((response) => {
            console.log(response.data)
            setUserDetails(response.data)
        })
    }, [])

    

    return (
        <div>
            <h1 className="text-center text-2xl py-10">Manage Users</h1>
            <div className="mx-14 border py-7 rounded shadow">
                <div className="grid grid-cols-1 gap-y-10 items-center">
                    <div className="mx-10 flex gap-x-24 px-20">
                        <p className="">User ID</p>
                        <p>Email</p>
                        <p>Name</p>
                        <p>Role</p>
                    </div>
                    {
                        userDetails?.map(
                            (user: any) => {

                                return (
                                    <>
                                        {/* <div className="mx-10 flex gap-x-10" key={user.id}>
                                            <button className="border" onClick={() => {
                                                open = !open
                                                console.log(open)
                                            }}>Edit</button>
                                            <p>{user.id}</p>
                                            <p>{user.email}</p>
                                            <p>{user.firstName} {user.lastName} </p>
                                            <p>{user.roles}</p>
                                        </div> */}
                                        <UserListing id={user.id} email={user.email} firstName={user.firstName} lastName={user.lastName} roles={user.roles} keys={user.id}/>
                                    </>
                                )
                            }

                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ManageUser
