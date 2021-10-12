import React, { useEffect, useState } from 'react'
import AdminService from '../services/AdminService';
import UserListing from '../components/UserListing';
import CreateUserModal from '../components/CreateUserModal';
import PageLinks from '../components/PageLinks';

const ManageUser = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [createUser, setCreateUser] = useState(false);
    const [numPages, setNumPages] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    const [deleteMessage, setDeleteMessage] = useState("");

    useEffect(() => {
        AdminService.getAllUsers(currPage).then((response) => {
            console.log(response)
            setUserDetails(response.data.content)
            setNumPages(response.data.totalPages)
        })
    }, [currPage, createUser, deleteMessage])



    return (
        <div>
            <h1 className="text-center text-2xl pt-10">Manage Users</h1>
            <div className="pt-1 text-center pb-7">Please only edit those fields that you wish to change</div>
            <button className="mx-20 mb-3 border px-2 py-1 bg-green-standard rounded text-white-standard"
                onClick={() => { setCreateUser(true) }}>Create new User</button>
            <div className="mx-14 border pt-6 pb-8 rounded shadow">
                <div className="grid grid-cols-1 gap-y-9 items-center">
                    <div className="grid grid-cols-12 gap-x-6 mx-10">
                        <div className="col-span-1"></div>
                        <p className="col-span-1">UserID</p>
                        <p className="col-span-3">Email</p>
                        <p className="col-span-2">Name</p>
                        <p className="col-span-2">Role</p>
                        <p>Edit</p>
                    </div>
                    {
                        userDetails?.map(
                            (user: any) => {
                                return (
                                    <UserListing id={user.id} email={user.email} firstName={user.firstName} lastName={user.lastName} roles={user.roles} key={user.id} {...{setDeleteMessage}}/>
                                )
                            }
                        )
                    }
                </div>
            </div>
            <p className="mx-auto text-red-200 text-center pt-2">{deleteMessage}</p>
            <PageLinks {...{ numPages, currPage, setCurrPage}} />
            <div>
            </div>
            <CreateUserModal {...{ createUser, setCreateUser }} />
        </div>
    )
}

export default ManageUser
