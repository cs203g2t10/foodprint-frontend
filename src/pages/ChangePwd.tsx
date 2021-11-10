import { useEffect, useState } from 'react'
import LogInService, { UserDetails } from '../services/LogInService';
import AdminService from '../services/AdminService';

const ChangePwd = () => {
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const [regexp] = useState("(?=^.{8,}$)(?=.*\\d)(?=.*[a-zA-Z])(?!.*\\s)[0-9a-zA-Z*$-+?_&=!%{}/'.]*$");

    const [id, setId] = useState(0)
    const [email, setEmail] = useState("")
    const [oldPwd, setOldPwd] = useState("")
    const [newPwd, setNewPwd] = useState("")
    const [confirmNewPwd, setConfirmNewPwd] = useState("")
    const [loading, setLoading] = useState(false);
    
    const update = () => {
        setLoading(true);
        if (!validateNewPwd(newPwd, confirmNewPwd) || oldPwd.length === 0) {
            setLoading(false);
            return;
        }

        console.log(email)
        AdminService.updateUserPwd(id, email, oldPwd, newPwd).then((response: any) => {
            console.log(response);
            if (response.status === 200) {
                setSuccess(true);
                if (error) {
                    setError("");
                }
            }
            setLoading(false);
        }).catch((error) => {
            console.log(error.response);
            setError(error.response.data.message);
            if (error.response.status === 400) {
                setError("old password is wrong")
            }
            setSuccess(false);
            setLoading(false);
        })
    }

    const validateNewPwd = (newPassword: string, confirmNewPassword: string) => {
        if (newPassword.length < 8 || newPassword.length > 60 || confirmNewPassword.length < 8 || confirmNewPassword.length > 60) {
            setError("password size must be between 8 and 60");
            return false;
        }
        if (newPassword.length === 0 || !newPassword.match(regexp) || !confirmNewPassword.match(regexp)) {
            setError("password must have 1 letter, 1 number and at least 8 characters");
            return false;
        }
        if (newPassword !== confirmNewPassword) {
            setError("passwords don't match");
            return false;
        }
        return true;
    }

    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        setId(userInfo.userId);
        setEmail(userInfo.email);
    }, [])

    return (
        <div className="bg-yellow-standard h-screen ">
            <div className="flex justify-center">
                <div className="mt-20 mb-10 bg-white-standard w-7/12 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl">
                    <div className="ml-16 mt-12 mb-10">
                        <h1 className="text-3xl font-bold mb-2 text-green-standard">Change Password</h1>
                        <h2 className="text-grey-lighter mb-1">Enter old and new password</h2>
                        <div className="mb-4">
                            <input className="focus:outline-none px-4 py-1 mt-4 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="Old password"
                                type="password"
                                onChange={e => setOldPwd(e.target.value)} />
                            <input className="focus:outline-none px-4 py-1 mt-4 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="New password"
                                type="password"
                                onChange={e => setNewPwd(e.target.value)} />
                            <input className="focus:outline-none px-4 py-1 mt-4 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="Confirm new password"
                                type="password"
                                onChange={e => setConfirmNewPwd(e.target.value)} />
                        </div>
                        {
                            (error ? <>
                                <h1 className="text-sm text-red-standard mt-2">{error}</h1>
                            </>
                                : <></>)
                        }
                        {
                            (success ? <div className="text-green-standard mt-2">Your password has been successfully changed!</div>
                            : <div className="flex">
                                <button className="rounded-full px-4 text-white-standard bg-green-standard hover:shadow text-center mt-2 h-8 md:w-48"
                                    onClick={update}>
                                        {
                                            loading ? <div className="spinner" />
                                            : 'Change Password'
                                        }
                                    {/* <span id="button-text">Change password
                                    </span> */}
                                </button>
                            </div>)
                        }
                    </div>
                    <div>
                        <img className="mt-8 my-7 transform scale-90" src="/images/changePwd.png" alt="change password illustration" style={{'borderRadius':'25px'}}/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ChangePwd