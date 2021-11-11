import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ResetPwdService from '../services/ResetPwdService'
import queryString from 'query-string'
import { BeatLoader } from 'react-spinners'

const ResetPwd = (props: any) => {
    const value = queryString.parse(window.location.search);
    const emailToken = value.token;

    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [regexp] = useState("(?=^.{8,}$)(?=.*\\d)(?=.*[a-zA-Z])(?!.*\\s)[0-9a-zA-Z*$-+?_&=!%{}/'.]*$");
    const [processing, setProcessing] = useState(false)

    const validateForm = (newPassword: string, confirmNewPassword: string) => {
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

    const resetPwd = () => {
        setProcessing(true)
        if (!validateForm(newPassword, confirmNewPassword)) {
            setProcessing(false)
            return;
        }

        const response = ResetPwdService.resetPwd(emailToken, newPassword);
        response.then(resp => {
            console.log(resp.data.status);
            setSuccess(true);
            if (error) {
                setError("");
            }
        }).catch(error => {
            setError("invalid token");
        })
        setProcessing(false)
    }

    return (
        <div className="bg-yellow-standard h-screen">
            <div className="flex justify-center">
                <div className="mt-32 bg-white-standard w-10/12 md:w-7/12 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl pb-10">
                    <div className="ml-16 mt-16">
                        <h1 className="text-3xl font-semibold mb-2 text-green-standard mt-8">Reset password</h1>
                        <h1 className="text-grey-lighter mb-5 text-sm">Please choose a new password.</h1>
                        <div className="mb-4">
                            <input className="focus:outline-none px-4 py-1 mt-4 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="New password"
                                type="password"
                                onChange={e => setNewPassword(e.target.value)} />
                            <input className="focus:outline-none px-4 py-1 mt-4 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="Confirm new password"
                                type="password"
                                onChange={e => setConfirmNewPassword(e.target.value)} />
                        </div>
                        {
                            (error ? <div className="pt-3 pb-2 text-red-standard">{error}</div> : <></>)
                        }
                        {
                            (success ?
                                <>
                                    <div className="pb-6">Your password has been successfully changed!</div>
                                    <Link to="/login" className="bg-green-standard mt-4 pt-2 pb-3 px-5 text-center text-white-standard hover:shadow-lg rounded-xl">Proceed to log in!</Link>
                                </>
                                : <div className="flex">
                                    <button className="rounded-full px-4 text-white-standard bg-green-standard hover:shadow text-justify mt-2 h-8"
                                        onClick={() => { resetPwd() }}>
                                        <span id="button-text">
                                            {processing ? (
                                                <BeatLoader size="9" color="#daeddb" />
                                            ) : (
                                                'Reset password'
                                            )}
                                        </span>
                                    </button>
                                </div>)
                        }
                    </div>
                    <div>
                        <img className="w-85 transform scale-75" src="/images/resetPassword.png" alt="reset password illustration" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPwd
