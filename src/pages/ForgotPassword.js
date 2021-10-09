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
            <div className="flex justify-center">
                <div className="mt-32 bg-white-standard w-10/12 md:w-7/12 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl">
                    <div className="ml-16 mt-16">
                        <h1 className = "text-3xl font-bold mb-2">Forgot your password?</h1>
                        <h2 className = "text-grey-lighter mb-5">Enter your email</h2>
                        <div className = "mb-4">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="test@example.com"
                                type="email"
                                onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="pt-5 flex">
                            <button className="rounded-xl px-5 border hover:shadow text-justify h-8" disabled={!validateForm}
                                onClick={requestResetPwd}>Reset Password</button>
                        </div>
                    </div>

                    <div>
                        <img className = "mt-16 my-7 transform scale-90" src="/images/forgot-password.png" alt="forgot password illustration" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ResetPwd)
