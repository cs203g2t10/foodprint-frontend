import React from 'react'
import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import ResetPwdService from '../services/ResetPwdService'



const ResetPwd = () => {
    const [email, setEmail] = useState(window.sessionStorage.getItem("email"))

    const validateForm = () => {
        return email > 0;
    }

    const requestResetPwd = () => {
        ResetPwdService.requestResetPwd(email).then((response) => {
            if (response.data.status === "SUCCESS") {
                console.log(response.data.token)
                window.sessionStorage.setItem("token", response.data.token)
            }
        })
    }

    return (
        <div className="bg-yellow-standard h-screen">
            <div className="flex justify-center object-contain">
                <div className="h-auto mt-36 bg-white-standard w-10/12 md:w-6/12 grid md:grid-cols-2 shadow-xxl rounded-xxl">
                    <div className="ml-16 mt-16">
                        <h1 className = "text-3xl font-bold mb-2 text-green-standard">Gold Fish Brain?</h1>
                        <h2 className = "text-grey-lighter mb-5 text-sm">Enter the email associated with your account and we’ll send an email with instructions to reset your password</h2>
                        <div className = "mb-4">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="test@example.com"
                                type="email"
                                onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="pt-5 flex">
                            <button className="rounded-xl px-5 bg-green-standard text-white-standard shadow-sm hover:shadow-md text-justify h-8" disabled={!validateForm}
                                onClick={requestResetPwd}>Reset Password</button>
                        </div>
                    </div>

                    <div>
                        <img className = "object-fill w-full h-96 pl-5 rounded-xxl" src="/images/fish.png" alt="forgot password illustration" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ResetPwd)
