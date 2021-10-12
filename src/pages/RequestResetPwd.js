import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import ResetPwdService from '../services/ResetPwdService'

const ResetPwd = () => {
    const [email, setEmail] = useState(window.sessionStorage.getItem("email"))

    const [successfulReq, setSuccessfulReq] = useState(false)

    const validateForm = () => {
        return email > 0;
    }

    const requestResetPwd = () => {
        ResetPwdService.requestResetPwd(email).then((response) => {
            if (response.data === "Email sent, check your inbox!") {
                console.log(response.data)
                setSuccessfulReq(true)
            }
        }).catch((response) => {
            console.log(response)
        })
    }

    return (
        <div className="bg-yellow-standard h-screen">
            <div className="flex justify-center">
                <div className="mt-20 bg-white-standard w-10/12 md:w-7/12 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl">
                    <div className="ml-16 mt-12">
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

                        {
                            (successfulReq ? <div className="text-green-standard pb-4 mt-4">We have sent you an email!</div> : <div className=""></div>)
                        }
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
