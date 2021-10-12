import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import LogInService from '../services/LogInService';

const VerifyAccount = () => {
    const [emailToken, setEmailToken] = useState("");
    const [success, setSuccess] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [empty, setEmpty] = useState(false);

    const confirmToken = (token: any) => {
        console.log(token)
        if (token.length === 0) {
            if (invalid) {
                setInvalid(false)
            }
            setEmpty(true);
            return;
        }
        const response = LogInService.userConfirmToken(emailToken);
        response.then(resp => {
            console.log(resp.data.status);
            setSuccess(true);
            if (invalid) {
                setInvalid(false);
            } else if (empty) {
                setEmpty(false);
            }
        }).catch(error => {
            console.log(error);
            if (empty) {
                setEmpty(false);
            }
            setInvalid(true);
        })

    }

    return (
        <div className="bg-yellow-standard h-screen">
            <div className="flex justify-center">
                <div className="mt-32 bg-white-standard w-10/12 md:w-7/12 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl pb-10">
                    <div className="ml-16 mt-16">
                        <h1 className="text-3xl font-bold mb-2">Verify Account</h1>
                        <h2 className="text-grey-lighter mb-5">We have sent you an email with your token!</h2>
                        <div className="mb-4">
                            <input className="focus:outline-none px-4 py-1 mt-1 h-10 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="Copy and paste token here"
                                onChange={e => setEmailToken(e.target.value)} />
                        </div>
                        {
                            (invalid ? <div className="text-red-standard pb-4">You have entered an invalid token. Please try again!</div> : <div className=""></div>)
                        }
                        {
                            (empty ? <div className="text-red-standard pb-4">Please enter a value</div> : <div className=""></div>)
                        }
                        {
                            (success ?
                                <>
                                    <div className="pb-4">Your account has been verified!</div>
                                    <Link to="/login" className="bg-green-standard mt-4 pt-2 pb-3 px-5 text-center text-white-standard hover:shadow-lg rounded-xl">Proceed to log in!</Link>
                                </>
                                : <div className="flex">
                                    <button className="rounded-xl px-5 border hover:shadow text-justify h-8"
                                        onClick={()=>{confirmToken(emailToken)}}>Verify Account</button>
                                    <Link to="/" className="mx-2 py-2 px-2 self-end text-blue-700 ">Resend Email</Link>
                                </div>)
                        }
                    </div>
                    <div>
                        <img className="mt-16 my-7 w-80 transform scale-90" src="/images/login.png" alt="log in illustration" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyAccount
