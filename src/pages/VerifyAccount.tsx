import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LogInService from '../services/LogInService'
import queryString from 'query-string'

const VerifyAccount = (props: any) => {
    const value = queryString.parse(window.location.search);
    const emailToken = value.token;
    console.log("token", emailToken)

    const [success, setSuccess] = useState(false);
    const [invalid, setInvalid] = useState(false);

    const confirmToken = () => {
        if (emailToken === null || emailToken === undefined || emailToken.length === 0) {
            return;
        }
        const response = LogInService.userConfirmToken(emailToken);
        response.then(resp => {
            console.log(resp.data.status);
            setSuccess(true);
            if (invalid) {
                setInvalid(false);
            }
        }).catch(error => {
            console.log(error);
            setInvalid(true);
        })
    }

    return (
        <div className="bg-yellow-standard h-screen">
            <div className="flex justify-center">
                <div className="my-32 bg-white-standard w-10/12 md:w-1/2 py-10 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl pb-10">
                    <div className="ml-16 mt-16">
                        <h1 className="text-4xl font-bold mb-2 tracking-wide text-green-standard">Verify Account</h1>
                        <h1 className="text-base mb-2 tracking-wide text-grey-standard">Hello, welcome to foodprint! Please click to verify your account.</h1>
                        {
                            (invalid ? <div className="text-red-standard pb-4 mt-6">Your token is invalid. Please try again!</div>
                                : <div className="">

                                </div>)
                        }
                        {
                            (success ?
                                <>
                                    <div className="mt-4 pb-8">Your account has been verified!</div>
                                    <Link to="/login" className="bg-green-standard mt-4 pt-2 pb-3 px-5 text-center text-white-standard hover:shadow-lg rounded-xl">Proceed to log in!</Link>
                                </>
                                : <div className="">
                                    <button className="rounded-xl mt-4 px-5 border hover:shadow text-justify h-9 text-green-standard border-green-standard"
                                        onClick={() => { confirmToken() }}>Verify account</button>
                                </div>)
                        }
                    </div>
                    <div>
                        <img className="my-auto grid pb-10" src="/images/welcome.webp" alt="verify" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyAccount
