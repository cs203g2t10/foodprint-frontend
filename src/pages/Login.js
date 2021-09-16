import React from 'react'
import { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import LogInService from '../services/LogInService'
import { useAppContext } from '../lib/contextLib';



const Login = () => {
    const { userHasAuthenticated } = useAppContext();
    
    const [email, setEmail] = useState("")
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
                <Link to="/" onClick="true"></Link>
                return <Redirect to='/home'/>
            }
        })
    }
    
    

    return (
        <div className=" w-full h-full">
            <h1 className="text-center text-7xl py-12 pb-8">Log In</h1>
            <div className="h-full bg-white mx-14 pb-10">
                <div className="flex grid grid-cols mx-16 gap-y-2 border border-gray-100 shadow p-24 rounded-lg">
                    <div className="">
                        <h1 className="ml-2">Email</h1>
                        <input className="focus:outline-none px-4 py-1 my-1 rounded shadow border border-gray-100 md:w-2/5"
                            placeholder="test@example.com"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="">
                        <h1 className="ml-2">Password</h1>
                        <input className="focus:outline-none px-4 py-1 my-1 rounded shadow border border-gray-100 md:w-2/5"
                            placeholder="********"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </div>


                    <div className="pt-5 flex gap-x-3">
                        <button className="rounded-lg px-4 py-2 border hover:shadow" disabled={!validateForm}
                            onClick={userLogin}>Log in</button>
                        <Link to="/login" className="mx-2 py-2 px-2 self-end text-blue-700 text-right">Forgot Password?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
