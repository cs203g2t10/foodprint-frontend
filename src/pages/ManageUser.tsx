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
            <h1 className="text-center text-2xl pt-10">Manage Users</h1>
            <div className="pt-1 text-center pb-7">Please only edit those fields that you wish to change</div>
            <div className="mx-14 border pt-6 pb-8 rounded shadow">
                <div className="grid grid-cols-1 gap-y-9 items-center">
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
                                    <UserListing id={user.id} email={user.email} firstName={user.firstName} lastName={user.lastName} roles={user.roles} key={user.id} />
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
