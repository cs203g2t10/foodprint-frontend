import React, { useEffect, useState } from 'react'
import AdminService from '../services/AdminService';
import UserListing from '../components/UserListing';

const ManageUser = () => {
    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        AdminService.getAllUsers().then((response) => {
            console.log(response.data.content)
            setUserDetails(response.data.content)
        })
    }, [])



    return (
        <div>
            <h1 className="text-center text-2xl pt-10">Manage Users</h1>
            <div className="pt-1 text-center pb-7">Please only edit those fields that you wish to change</div>
            <div className="mx-14 border pt-6 pb-8 rounded shadow">
                <div className="grid grid-cols-1 gap-y-9 items-center">
                    <div className="grid grid-cols-12 gap-x-24 mx-10 justify-between">
                        <p className="col-span-1"></p>
                        <p className="col-span-1">UserID</p>
                        <p className="col-span-3">Email</p>
                        <p className="col-span-2">Name</p>

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
