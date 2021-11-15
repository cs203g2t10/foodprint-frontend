import { useRef } from 'react'
import { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import LogInService from '../services/LogInService'
import { useAppContext } from '../lib/AppContext';
import { BeatLoader } from 'react-spinners';



const Login = () => {
    const { isAuthenticated, setIsAuthenticated } = useAppContext();
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState(window.localStorage.getItem("email"))
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")
    const [error, setError] = useState("")
    const [twoFa, setTwoFa] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);

    const validateForm = () => {
        return (email) ? email.length > 0 : false && password.length > 0;
    }


    const user2Fa = () => {
        if (emailRef.current == null) {
            return;
        }
        const currentEmailInput = emailRef.current.value;
        LogInService.user2Fa(currentEmailInput).then((response: any) => {
            if (response.data === true) {
                setTwoFa(true);
            } else {
                setTwoFa(false);
            }
        })
    }


    const userLogin = () => {
        if (email === null || email === "" || password === "") {
            setError("Please fill up all fields");
            return;
        }
        setError("");
        setLoading(true);
        LogInService.userLogIn(email, password, token).then((response) => {
            setLoading(false);
            if (response.data.status === "SUCCESS") {
                window.localStorage.setItem("token", response.data.token)
                setIsAuthenticated(true);
            } else if (response.data.status === "INCORRECT") {
                console.log("Incorrect input")
                setError("Please enter a valid username and password!")
            } else {
                setError("Unexpected error occured. Please try again.")
            }
        })
    }

    if (isAuthenticated) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <div className="bg-yellow-standard h-screen">
            <div className="flex justify-center">
                <div className="md:mt-20 mt-10 bg-white-standard w-10/12 md:w-7/12 grid lg:grid-cols-2 shadow-xxl shadow rounded-lg pb-16">
                    <div className="md:ml-16 md:mt-16 ml-10 mt-10">
                        <h1 className="md:text-5xl text-3xl font-bold mb-2 text-green-standard">Log In</h1>
                        <h2 className="text-grey-lighter mb-5">Reduce food waste now!</h2>
                        <div className="mb-4">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-full w-11/12"
                                placeholder="test@example.com"
                                type="email"
                                onChange={e => { setEmail(e.target.value); user2Fa() }}
                                ref={emailRef}
                            />
                        </div>

                        <div className="">
                            <input className="focus:outline-none px-4 py-1 my-1 h-10 rounded-full border border-grey-lightest md:w-full w-11/12"
                                placeholder="********"
                                type="password"
                                onChange={e => setPassword(e.target.value)} />
                        </div>

                        {twoFa &&
                            <div className="">
                                <input className="focus:outline-none px-4 py-1 my-4 h-10 rounded-full border border-grey-lightest md:w-full"
                                    placeholder="2FA OTP"
                                    type="number"
                                    onChange={e => setToken(e.target.value)} />
                            </div>
                        }

                        <div className="grid md:grid-cols-2 pt-5 gap-x-4 pb-2 md:w-full w-11/12 gap-y-4 ">
                            <button className="rounded-lg bg-green-standard shadow-sm hover:shadow-md text-white-standard opacity-90 hover:opacity-100 text-center py-1" disabled={!validateForm}
                                onClick={userLogin}>
                                {loading ? <BeatLoader size="9" color="#daeddb" />
                                    : 'Log in'}
                            </button>
                            <Link to="/forgotpassword" className=" w-full py-1 border shadow-sm hover:shadow-md rounded-lg border-green-standard text-green-standard text-center">Forgot password?</Link>
                        </div>
                        <div className="text-red-standard">{error}</div>
                        <h2 className="text-grey-lighter mt-2">Don't have an account? <Link to='/register' className="text-green-standard">Register now!</Link></h2>

                    </div>
                    <div>
                        <img className="mt-16 my-7 hidden md:block" src="/images/login.png" alt="log in illustration" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
