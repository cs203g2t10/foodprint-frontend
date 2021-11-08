import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import LogInService, { UserDetails } from '../services/LogInService';
import { useAppContext } from '../lib/AppContext';
import TwoFaService from '../services/TwoFaService';

const TwoFa = () => {
    const [token, setToken] = useState("")
    const [error, setError] = useState("")
    const [twoFa, setTwoFa] = useState(false);
    const [QRUrl, setQRUrl] = useState("")
    
   
    // const twoFaSet = () => {
    //     const userInfo: UserDetails = LogInService.getUserDetails();
    //     LogInService.user2Fa(`${userInfo.email}`).then((response: any) => {
    //         setTwoFa(response.data == true);
    //     })
    // }

    // useEffect(() => {
    //     const userInfo: UserDetails = LogInService.getUserDetails();
    //     LogInService.user2Fa(`${userInfo.email}`).then((response: any) => {
    //         setTwoFa(response.data == true);
    //     })

    //     // TwoFaService.enable().then((response: any) => {
    //     //     setQRUrl(response.data);
    //     // })
    // }
    // ) 

    return (

        <div className="bg-yellow-standard h-screen">
            <div className="flex justify-center">
                <div className="mt-32 bg-white-standard w-10/12 md:w-7/12 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl">
                    <div className="ml-16 mt-16">
                        {
                            (!twoFa ?
                                <>
                                <h1 className="text-3xl font-bold mb-2 text-green-standard">Enable Two-Factor Authentication</h1>
                                </>
                                :
                                <h1 className="text-3xl font-bold mb-2 text-green-standard">Disable Two-Factor Authentication</h1>
                            )
                        }
                            <div className="">
                                <input className="focus:outline-none px-4 py-1 my-4 h-11 rounded-full border border-grey-lightest md:w-11/12"
                                    placeholder="OTP"
                                    type="number"
                                    onChange={e => setToken(e.target.value)} />
                            </div>
                      

                        {/* <div className="flex pt-5">
                            <button className="rounded-xl px-5 mr-5 bg-green-standard shadow-sm hover:shadow-md text-white-standard text-justify h-8" disabled={!validateForm}
                                onClick={}>Log in</button>
                            <Link to="/forgotpassword" className="mx-2 py-1 px-4 self-end border shadow-sm hover:shadow-md rounded-full border-green-standard text-green-standard">Forgot password?</Link>
                        </div> */}

                        {
                            (error ? <div className="pt-3 pb-2 text-red-standard">{error}</div> : <></>)
                        }

                    </div>


                    {
                            (!twoFa ?
                                <>
                                <div>
                                    <img className="mt-16 my-7 transform scale-90" src="/images/login.png" alt="log in illustration" />
                                </div>
                                </>
                                :
                                <div>
                                    <img className="mt-16 my-7 transform scale-90" src="/images/login.png" alt="log in illustration" />
                                </div>
                            )
                        }
                    


                </div>
            </div>
        </div>
    )
}

export default TwoFa