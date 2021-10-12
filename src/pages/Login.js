import React from 'react'
import { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import LogInService from '../services/LogInService'
import { useAppContext } from '../lib/contextLib';



const Login = () => {
    const { isAuthenticated, userHasAuthenticated } = useAppContext();
    
    const [email, setEmail] = useState(window.sessionStorage.getItem("email"))
    const [password, setPassword] = useState("")

    const validateForm = () => {
        return email > 0 && password > 0;
    }

    const userLogin = () => {
        LogInService.userLogIn(email, password).then((response) => {
            if (response.data.status === "SUCCESS") {
                console.log(response.data.token)
                window.sessionStorage.setItem("token", response.data.token)
                userHasAuthenticated(true);
            }
        })
    }
    
    if (isAuthenticated) {
        return (
            <Redirect to = "/"/>
        )
    }

    return (
        <div className="bg-yellow-standard h-screen">
            <div className="flex justify-center">
                <div className="mt-32 bg-white-standard w-10/12 md:w-7/12 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl">
                    <div className="ml-16 mt-16">
                        <h1 className = "text-3xl font-bold mb-2 text-green-standard">Log In</h1>
                        <h2 className = "text-grey-lighter mb-5">Reduce food waste now !</h2>
                        <div className = "mb-4">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="test@example.com"
                                type="email"
                                onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="********"
                                type="password"
                                onChange={e => setPassword(e.target.value)} />
                        </div>

                        <div className="pt-5 flex">
                            <button className="rounded-xl px-5 mr-5 bg-green-standard shadow-sm hover:shadow-md text-white-standard text-justify h-8" disabled={!validateForm}
                                onClick={userLogin}>Log in</button>
                            <Link to="/forgotpassword" className="mx-2 py-1 px-4 self-end border shadow-sm hover:shadow-md rounded-full border-green-standard text-green-standard">Forgot Password?</Link>
                        </div>
                    </div>

                    <div>
                        <img className = "mt-16 my-7 transform scale-90" src="/images/login.png" alt="log in illustration" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
