import { useEffect, useState } from 'react'
import AdminService from '../services/AdminService';
import UserListing from '../components/UserListing';
import CreateUserModal from '../components/CreateUserModal';
import PageLinks from '../components/PageLinks';
import LogInService, { UserDetails } from '../services/LogInService';
import Restricted from '../components/errors/Restricted';
import Loading from '../components/Loading';
import CreateManagerModal from '../components/CreateManagerModal';

const ManageUser = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [createUser, setCreateUser] = useState(false);
    const [createManager, setCreateManager] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState("");
    const [isAuthorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(false);

    const [numPages, setNumPages] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    const [emailContains, setEmailContains] = useState("");
    const [sortField, setSortField] = useState("id");

    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        if (userInfo.userAuthorities.includes("FP_ADMIN")) {
            setAuthorized(true);
        }
    }, [])

    useEffect(() => {
        setUserDetails([]);
        setLoading(true);
        AdminService.getAllUsers(emailContains, currPage, sortField).then((response) => {
            console.log(response)
            setUserDetails(response.data.content)
            setNumPages(response.data.totalPages)
            setLoading(false);
        })
    }, [currPage, createUser, deleteMessage, emailContains, sortField])

    if (!isAuthorized) {
        return (<Restricted />)
    }

    return (
        <div className="min-h-screen">
            <h1 className="text-center font-bold tracking-wide text-5xl text-green-standard  bg-yellow-standard">Manage Users</h1>
            <div className="pt-1 text-center pb-7 text-grey-standard bg-yellow-standard mb-5">Please only edit those fields that you wish to change</div>

            <p className="mx-auto text-green-standard text-center pt-4 pb-4">{deleteMessage}</p>
            <div className="md:flex gap-x-2 justify-between mr-16 mb-5 ml-16 ">
                <div className="md:flex gap-x-2 ">
                    <span className="">Filter Email: </span>
                    <input className="border border-grey-lightest bg-white-offWhite focus:outline-none md:px-4 px-1 py-1 rounded-large shadow-sm" value={emailContains} onChange={(e) => { setEmailContains(e.target.value) }}></input>
                </div>
                <div className="md:flex gap-x-2">
                    <button className="border px-4 py-1 bg-green-standard rounded-lg shadow-sm hover:shadow-md text-white-standard flexopacity-90 hover:opacity-100"
                        onClick={() => { setCreateManager(true) }}>Create Manager</button>
                    <button className="border px-4 py-1 bg-green-standard rounded-lg shadow-sm hover:shadow-md text-white-standard flexopacity-90 hover:opacity-100"
                        onClick={() => { setCreateUser(true) }}>Create new User</button>
                </div>
            </div>

            <div className="md:mx-14 bg-white-offWhite pt-6 pb-8 rounded-xxl shadow">
                <div className="grid grid-cols-1 gap-y-9 items-center">
                    <div className="grid grid-cols-11 gap-x-6 mx-6">
                        <div className="col-span-1"></div>
                        <p className="col-span-1 text-lg text-grey-dark cursor-pointer" onClick={() => { setSortField("id") }} >User ID</p>
                        <p className="col-span-3 text-lg text-grey-dark cursor-pointer" onClick={() => { setSortField("email") }}>Email</p>
                        <p className="col-span-2 text-lg text-grey-dark cursor-pointer" onClick={() => { setSortField("firstName") }}>Name</p>
                        <p className="col-span-3 text-lg text-grey-dark cursor-pointer" onClick={() => { setSortField("roles") }}>Role</p>
                        <p className="col-span-1 text-lg text-grey-dark">Edit</p>
                    </div>
                    {
                        userDetails?.map(
                            (user: any) => {
                                return (
                                    <UserListing id={user.id} email={user.email} firstName={user.firstName} lastName={user.lastName} roles={user.roles} key={user.id} {...{ setDeleteMessage }} />
                                )
                            }
                        )
                    }
                </div>
            </div>
            {
                loading &&
                <div className="flex justify-center py-1">
                    <Loading />
                </div>
            }
            <PageLinks {...{ numPages, currPage, setCurrPage }} />
            <div>
            </div>
            <CreateManagerModal {...{createManager, setCreateManager}} />
            <CreateUserModal {...{ createUser, setCreateUser }} />
        </div>
    )
}

export default ManageUser
