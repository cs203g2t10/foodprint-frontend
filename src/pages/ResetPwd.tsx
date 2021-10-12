import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ResetPwdService from '../services/ResetPwdService';
import queryString from 'query-string'

const ResetPwd = (props: any) => {
    const value=queryString.parse(window.location.search);
    const emailToken=value.token;
    console.log("token", emailToken)

    const [newPassword, setNewPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [invalidToken, setInvalidToken] = useState(false);

    const validateForm = () => {
        return newPassword.length > 0;
    }

    const resetPwd = () => {
        if (!validateForm) {
            return;
        }

        const response = ResetPwdService.resetPwd(emailToken, newPassword);
        response.then(resp => {
            console.log(resp.data.status);
            setSuccess(true);
            if (invalidToken) {
                setInvalidToken(false);
            } 
        }).catch(error => {
            console.log(error);
            setInvalidToken(true);
        })
    }

    return (
        <div className="bg-yellow-standard h-screen">
            <div className="flex justify-center">
                <div className="mt-32 bg-white-standard w-10/12 md:w-7/12 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl pb-10">
                    <div className="ml-16 mt-16">
                        <h1 className="text-3xl font-bold mb-2">Reset password</h1>
                        <div className="mb-4">
                            <input className="focus:outline-none px-4 py-1 mt-4 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="New password"
                                type="password"
                                onChange={e => setNewPassword(e.target.value)} />
                        </div>
                        {
                            (invalidToken ? <div className="text-red-standard pb-4">Your token is invalid. Please try again!</div> : <div className=""></div>)
                        }
                        {
                            (success ?
                                <>
                                    <div className="pb-6">Your password has been successfully changed!</div>
                                    <Link to="/login" className="bg-green-standard mt-4 pt-2 pb-3 px-5 text-center text-white-standard hover:shadow-lg rounded-xl">Proceed to log in!</Link>
                                </>
                                : <div className="flex">
                                    <button className="rounded-xl px-5 border hover:shadow text-justify mt-2 h-8"
                                        onClick={()=>{resetPwd()}}>Reset Password</button>
                                </div>)
                        }
                    </div>
                    <div>
                        <img className="mt-16 my-7 w-85 transform scale-90" src="/images/login.png" alt="log in illustration" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPwd
