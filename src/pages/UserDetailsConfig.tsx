import { useEffect, useState } from 'react'
import LogInService, { UserDetails } from '../services/LogInService';
import AdminService from '../services/AdminService';
import { AiFillEdit, AiOutlineCheck} from 'react-icons/ai';

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
    
    const update = () => {
        console.log(email, fName, lName)
        AdminService.updateUserDetails(id, email, fName, lName).then((response: any) => {
            console.log(response);
            if (response.status === 200) {
                setSuccess(true);
                if (error) {
                    setError("");
                }
            }
        }).catch((error) => {
            console.log(error.response);
            setError(error.response.data.message);
            setSuccess(false);
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
                <div className="mt-28 mb-10 bg-white-standard w-7/12 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl">
                    <div className="ml-16 my-auto">
                        <h1 className="text-4xl font-semibold mb-2 text-green-standard mt-5">Update Details</h1>
                        <h2 className="text-grey-lighter mb-5">Make changes to fields you wish to update</h2>

                        <div className="mb-4">
                            {(editFName ? <>
                                <button disabled={!verify(fName)} className="shadow-sm hover:shadow-md px-2 mr-2 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                                    onClick={() => {
                                        update();
                                        setEditFName(false);
                                    }}><AiOutlineCheck /></button>
                                <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-10/12"
                                    placeholder="First Name"
                                    value={fName}
                                    onChange={e => setFName(e.target.value)} />
                                </> :
                                <div className="focus:outline-none py-1 my-1 h-10 rounded-full md:w-10/12">
                                <button className="shadow-sm hover:shadow-md px-2 mr-2 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                                    onClick={() => setEditFName(true)}><AiFillEdit /></button>
                                {fName}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            {(editLName ? <>
                                <button disabled={!verify(lName)} className="shadow-sm hover:shadow-md px-2 mr-2 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                                    onClick={() => {
                                        update();
                                        setEditLName(false);
                                    }}><AiOutlineCheck /></button>
                                <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-10/12"
                                    placeholder="Last Name"
                                    value={lName}
                                    onChange={e => setLName(e.target.value)} />
                                </> :
                                <div className="focus:outline-none py-1 my-1 h-10 rounded-full md:w-10/12">
                                <button className="shadow-sm hover:shadow-md px-2 mr-2 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                                    onClick={() => setEditLName(true)}><AiFillEdit /></button>
                                {lName}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            {(editEmail ? <>
                                <button disabled={!verify(email)}  className="shadow-sm hover:shadow-md px-2 mr-2 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                                    onClick={() => {
                                        update();
                                        setEditEmail(false);
                                    }}><AiOutlineCheck /></button>
                                <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-10/12"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)} />
                                </> :
                                <div className="focus:outline-none py-1 my-1 h-10 rounded-full md:w-10/12">
                                <button className="shadow-sm hover:shadow-md px-2 mr-2 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
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
                            (success ? <div className="text-green-standard mt-2">Changes will be reflected when you relogin!</div> : <div className=""></div>)
                        }

                    </div>
                    <div>
                        <img className="transform scale-90" src="/images/UserDetailsConfig.png" alt="user details config illustration" style={{'borderRadius':'25px'}}/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UserDetailsConfig