import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import LogInService from '../services/LogInService'

const Register = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [successfulReg, setSuccessfulReg] = useState(false)

    const validateForm = () => {
        return email > 0 && password > 0;
    }

    const userRegister = () => {
        LogInService.userRegister(email, password, firstName, lastName).then((response) => {
            if (response.data.status === "SUCCESS") {
                console.log(response.data)
                setSuccessfulReg(true)
            }
        }).catch((response) => {
            console.log(response)
        })
    }

    if (successfulReg) {
        window.sessionStorage.setItem("email", email)
        return <Redirect to="/login"/>
    }

    return (
        <div>
            <h1 className="text-center text-7xl py-12 pb-10">Register</h1>
            <div className="h-full bg-white mx-14 pb-10">
                <div className="flex grid md:grid-cols-2 mx-16 gap-y-2 border border-gray-100 shadow p-24 rounded-lg">
                <div className="">
                        <h1 className="ml-2">First Name</h1>
                        <input className="focus:outline-none px-4 py-1 my-1 rounded shadow border border-gray-100 md:w-4/5"
                            placeholder="Bobby"

                            value={firstName}
                            onChange={e => setFirstName(e.target.value)} />
                    </div>

                    <div className="">
                        <h1 className="ml-2">Last Name</h1>
                        <input className="focus:outline-none px-4 py-1 my-1 rounded shadow border border-gray-100 md:w-4/5"
                            placeholder="Tan"

                            value={lastName}
                            onChange={e => setLastName(e.target.value)} />
                    </div>

                    <div className="">
                        <h1 className="ml-2">Email</h1>
                        <input className="focus:outline-none px-4 py-1 my-1 rounded shadow border border-gray-100 md:w-4/5"
                            placeholder="test@example.com"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="">
                        <h1 className="ml-2">Password</h1>
                        <input className="focus:outline-none px-4 py-1 my-1 rounded shadow border border-gray-100 md:w-4/5"
                            placeholder="********"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </div>


                    <div className="pt-5 flex gap-x-3">
                        <button className="rounded-lg px-4 py-2 border hover:shadow" disabled={!validateForm}
                            onClick={userRegister}>Sign up</button>
                        <Link to="/login" className="mx-2 py-2 px-2 self-end text-right hover:underline">Log in to existing account</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
