import { useEffect, useState } from 'react'
import LogInService, { UserDetails } from '../services/LogInService';
import { AiFillEdit, AiOutlineCheck } from 'react-icons/ai';
import UserService from '../services/UserService';
import { HashLoader } from 'react-spinners';

const UserDetailsConfig = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [editFName, setEditFName] = useState(false);
    const [editLName, setEditLName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);

    const [id, setId] = useState(0)
    const [email, setEmail] = useState("")
    const [prevEmail, setPrevEmail] = useState("")
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")

    const [firstNameLoading, setFirstNameLoading] = useState(false);
    const [lastNameLoading, setLastNameLoading] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);

    const updateFirstName = () => {
        setFirstNameLoading(true);
        UserService.updateUserFirstName(id, fName).then((response: any) => {
            console.log(response);
            setSuccess(true);
            setFirstNameLoading(false);
            setEditFName(false);
        }).catch((error) => {
            console.log(error.response);
            setError(error.response.data.message);
            setSuccess(false);
            setFirstNameLoading(false);
        })
    }

    const updateLastName = () => {
        setLastNameLoading(true);
        UserService.updateUserLastName(id, lName).then((response: any) => {
            console.log(response);
            setSuccess(true);
            setLastNameLoading(false);
            setEditLName(false);
        }).catch((error) => {
            console.log(error.response);
            setError(error.response.data.message);
            setSuccess(false);
            setLastNameLoading(false);
        })
    }

    const updateEmail = () => {
        setEmailLoading(true);
        UserService.updateUserEmail(id, email).then((response: any) => {
            console.log(response);
            setSuccess(true);
            setEmailLoading(false);
            setEditEmail(false);
        }).catch((error) => {
            console.log(error.response);
            setError(error.response.data.message);
            setSuccess(false);
            setEmailLoading(false);
        })
    }

    const verify = (str: string) => {
        return str.length > 0;
    }

    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        setId(userInfo.userId);
        setFName(userInfo.userFname);
        setLName(userInfo.userLname);
        setEmail(userInfo.email);
        setPrevEmail(userInfo.email);
    }, [])

    return (
        <div className="bg-yellow-standard h-screen ">
            <div className="flex justify-center">
                <div className="mt-16 mb-10 bg-white-standard w-7/12 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl">
                    <div className="ml-16 my-auto">
                        <h1 className="text-4xl font-semibold mb-2 text-green-standard mt-5">Update Details</h1>
                        <h2 className="text-grey-lighter mb-5">Make changes to fields you wish to update</h2>

                        <div className="mb-4 flex items-center">
                            {(editFName ? <>
                                <button disabled={!verify(fName)} className="shadow-sm hover:shadow-md mr-2 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard justify-center items-center px-2"
                                    onClick={() => { updateFirstName(); }}>
                                    {
                                        firstNameLoading ? <HashLoader size="15" color="#daeddb" />
                                            : <AiOutlineCheck />
                                    }
                                </button>
                                <input className="focus:outline-none px-4 py-0.5 my-1 h-10 rounded-full border border-grey-lightest md:w-10/12"
                                    placeholder="First Name"
                                    value={fName}
                                    onChange={e => setFName(e.target.value)} />
                            </> :
                                <div className="focus:outline-none py-1 my-1 h-10 rounded-full md:w-10/12 items-center">
                                    <button className="shadow-sm hover:shadow-md px-2 mr-6 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                                        onClick={() => setEditFName(true)}><AiFillEdit /></button>
                                    {fName}
                                </div>
                            )}
                        </div>

                        <div className="mb-4 flex items-center">
                            {(editLName ? <>
                                <button disabled={!verify(lName)} className="shadow-sm hover:shadow-md px-2 mr-2 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                                    onClick={() => { updateLastName(); }}>
                                    {
                                        lastNameLoading ? <HashLoader size="15" color="#daeddb" />
                                            : <AiOutlineCheck />
                                    }
                                </button>
                                <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-10/12"
                                    placeholder="Last Name"
                                    value={lName}
                                    onChange={e => setLName(e.target.value)} />
                            </> :
                                <div className="focus:outline-none py-1 my-1 h-10 rounded-full md:w-10/12">
                                    <button className="shadow-sm hover:shadow-md px-2 mr-6 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                                        onClick={() => setEditLName(true)}><AiFillEdit /></button>
                                    {lName}
                                </div>
                            )}
                        </div>

                        <div className="mb-4 flex items-center">
                            {(editEmail ? <>
                                <button disabled={!verify(email)} className="shadow-sm hover:shadow-md px-2 mr-2 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                                    onClick={() => { updateEmail(); }}>
                                    {
                                        emailLoading ? <HashLoader size="15" color="#daeddb" />
                                            : <AiOutlineCheck />
                                    }
                                </button>
                                <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-10/12"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} />
                            </> :
                                <div className="focus:outline-none py-1 my-1 h-10 rounded-full md:w-10/12">
                                    <button className="shadow-sm hover:shadow-md px-2 mr-6 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                                        onClick={() => setEditEmail(true)}><AiFillEdit /></button>
                                    {error ? prevEmail : email}
                                </div>
                            )}
                        </div>

                        {
                            (error ? <>
                                <h1 className="text-sm text-red-standard mt-2">{error}</h1>
                            </>
                                : <></>)
                        }
                        {
                            (success ? <div className="text-green-standard mt-2">Changes saved!</div> : <div className=""></div>)
                        }

                    </div>
                    <div>
                        <img className="transform scale-90" src="/images/UserDetailsConfig.png" alt="user details config illustration" style={{ 'borderRadius': '25px' }} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UserDetailsConfig