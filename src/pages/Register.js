import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LogInService from '../services/LogInService'

const Register = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState([])
    const [processing, setProcessing] = useState(false);

    const [successfulReg, setSuccessfulReg] = useState(false)

    const validateForm = () => {
        return email > 0 && password > 0;
    }

    const userRegister = () => {
        setProcessing(true);
        LogInService.userRegister(email, password, firstName, lastName).then((response) => {
            if (response.status === 200) {
                console.log('Successful registration')
                setSuccessfulReg(true)
            }
            else if (response.status === 400) {
                console.log(response.data.message)
                response.data.message.forEach((msg) => {
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
                <div className="mt-20 mb-10 bg-white-standard w-7/12 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl">
                    <div className="ml-16 mt-12 mb-10">
                        <h1 className="text-3xl font-bold mb-2 text-green-standard">Register</h1>
                        <h2 className="text-grey-lighter mb-5">Sign up now to get started!</h2>

                        <div className="mb-4">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="Your first name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="Your last name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)} />
                        </div>

                        <div className="mb-4">
                            <input className="text-sm focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="Your email"
                                type="email"
                                onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="********"
                                type="password"
                                onChange={e => setPassword(e.target.value)} />
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

                        <div className="pt-5 flex">
                            <button className="rounded-xl px-5 bg-green-standard text-white-standard shadow hover:shadow-md text-justify h-8" disabled={!validateForm}
                                onClick={userRegister}>
                                <span id="button-text">
                                    {processing ? (
                                        < div className="spinner" id="spinner"></div>
                                    ) : (
                                        'Sign up'
                                    )}
                                </span>
                            </button>

                            <Link to="/login" className="ml-6 py-1 px-5 self-end rounded-full text-green-standard border">Log In to existing Account</Link>
                        </div>
                    </div>
                    <div>
                        <img className="mt-16 my-7 transform scale-90" src="/images/register.png" alt="Register illustration" />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register
