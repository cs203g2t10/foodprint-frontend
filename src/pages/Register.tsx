import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import LogInService from '../services/LogInService'

const Register = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [error, setError] = useState("")
    const [processing, setProcessing] = useState(false)
    const [successfulReg, setSuccessfulReg] = useState(false)

    const validateForm = () => {
        return email.length > 0 && password.length > 0;
    }

    const userRegister = () => {
        if (password !== confirmPassword) {
            setError("passwords don't match");
            return;
        }

        setProcessing(true);
        LogInService.userRegister(email, password, firstName, lastName).then((response) => {
            if (response.status === 200) {
                console.log('Successful registration')
                setSuccessfulReg(true)
                setError("")
            }
            else if (response.status === 400) {
                console.log(response.data.message)
                response.data.message.forEach((msg: string) => {
                    setError(msg);
                })
            } else if (response.status === 409) {
                console.log(response.data.message)
                setError(response.data.message)
            } else {
                console.log(response);
            }
            setProcessing(false)
        })
    }

    if (successfulReg) {
        window.localStorage.setItem("email", email)
    }

    return (
        <div className="bg-yellow-standard h-screen ">
            <div className="flex justify-center">
                <div className="mt-12 mb-10 bg-white-standard w-7/12 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl">
                    <div className="ml-16 mt-12 mb-10">
                        <h1 className="text-5xl font-bold text-green-standard">Register</h1>
                        <h2 className="text-grey-lighter mb-2">Sign up now to get started!</h2>

                        <div className="mb-2">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-full"
                                placeholder="First Name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)} />
                        </div>

                        <div className="mb-2">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-full"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)} />
                        </div>

                        <div className="mb-2">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-full"
                                placeholder="Email"
                                type="email"
                                onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-2">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-full"
                                placeholder="Password"
                                type="password"
                                onChange={e => setPassword(e.target.value)} />
                        </div>

                        <div className="">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-full"
                                placeholder="Confirm Password"
                                type="password"
                                onChange={e => setConfirmPassword(e.target.value)} />
                        </div>


                        {
                            (error ? <>
                                <h1 className="text-sm text-red-standard mt-2">{error}</h1>
                            </>
                                : <></>)
                        }
                        {
                            (successfulReg ? <div className="text-green-standard mt-2">We have sent you an email!</div> : <div className=""></div>)
                        }

                        <div className="pt-5 flex w-full mb-8">
                            <button className="rounded-xl px-5 w-32 bg-green-standard text-white-standard shadow hover:shadow-md text-justify h-8" disabled={!validateForm}
                                onClick={userRegister}>
                                <span id="button-text">
                                    {processing ? (
                                        <BeatLoader size="9" color="#daeddb" />
                                    ) : (
                                        'Sign up'
                                    )}
                                </span>
                            </button>

                            <Link to="/login" className="text-center ml-6 py-1 px-5 w-full self-end rounded-full border-green-standard text-green-standard border">Log in to existing account</Link>
                        </div>
                    </div>
                    <div>
                        <img className="transform scale-95 my-auto mt-28" src="/images/register.png" alt="register illustration" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register
