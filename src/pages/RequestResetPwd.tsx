import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import ResetPwdService from '../services/ResetPwdService'

const ResetPwd = () => {
    const [email, setEmail] = useState(window.localStorage.getItem("email"))

    const [successfulReq, setSuccessfulReq] = useState(false)
    const [processing, setProcessing] = useState(false)

    const validateForm = () => {
        return (email) ? email.length > 0 : false;
    }

    const requestResetPwd = () => {
        if (email == null) {
            return;
        }
        setProcessing(true)
        ResetPwdService.requestResetPwd(email).then((response) => {
            if (response.data === "Email sent, check your inbox!") {
                console.log(response.data)
                setSuccessfulReq(true)
            }
        }).catch((response) => {
            console.log(response)
        })
        setProcessing(false)
    }

    return (
        <div className="bg-yellow-standard h-screen">
            <div className="flex justify-center object-contain">
                <div className="h-auto mt-36 bg-white-standard w-10/12 md:w-6/12 grid md:grid-cols-2 shadow-xxl rounded-xxl">
                    <div className="ml-16 mt-12">
                        <h1 className = "text-4xl font-bold mb-2 text-green-standard">Gold Fish Brain?</h1>
                        <h2 className = "text-grey-lighter mb-5 text-sm">Enter the email associated with your account and we’ll send an email with instructions to reset your password.</h2>
                        <div className = "mb-4">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="test@example.com"
                                type="email"
                                onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="pt-5 flex">
                            <button className="rounded-xl px-5 bg-green-standard text-white-standard shadow-sm hover:shadow-md text-justify h-8 opacity-90 hover:opacity-100" disabled={!validateForm}
                                onClick={requestResetPwd}>
                                    <span id="button-text">
                                        {processing ? (
                                            < div className="spinner" id="spinner"></div>
                                        ) : (
                                            'Reset password'
                                        )}
                                    </span>
                            </button>
                        </div>
                        {
                            (successfulReq ? <div className="text-green-standard pb-4 mt-4">We have sent you an email!</div> : <div className=""></div>)
                        }
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
