import { useEffect, useState } from 'react'
import LogInService, { UserDetails } from '../services/LogInService';
import TwoFaService from '../services/TwoFaService';

const TwoFa = () => {
    const [token, setToken] = useState("")
    const [error, setError] = useState("")
    const [twoFaEnabled, setTwoFaEnabled] = useState(false);
    const [QRUrl, setQRUrl] = useState("")
    const [enableSuccess, setEnableSuccess] = useState(false)
    const [disableSuccess, setDisableSuccess] = useState(false)

    const confirmTwoFaToken = () => {
        TwoFaService.confirm(token).then((response: any) => {
            console.log(response);
            if (response.status === 200) {
                setEnableSuccess(true);
            }
        }).catch((error) => {
            console.log(error.response);
            setError(error.response.data.message);
        })
    }

    const disable = () => {
        TwoFaService.disable(token).then((response: any) => {
            console.log(response);
            if (response.status === 200) {
                setDisableSuccess(true);
            }
        }).catch((error) => {
            console.log(error.response);
            setError(error.response.data.message);
        })
    }

    const twoFaSet = () => {
        TwoFaService.enable().then((response: any) => {
            console.log(response);
            setQRUrl(response.data);
        })
    }

    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();

        LogInService.user2Fa(`${userInfo.email}`).then((response) => {
            console.log(response)
            setTwoFaEnabled(response.data)
        })
        
        if (!twoFaEnabled) {
            twoFaSet()
        }
    }, [twoFaEnabled])

    return (
        <div className="bg-yellow-standard h-screen">
            <div className="flex justify-center">
                <div className="mt-32 bg-white-standard w-10/12 md:w-7/12 grid md:grid-cols-2 shadow-xxl shadow rounded-xxl">
                    <div className="ml-16 mt-16 mb-16">
                    <h1 className="text-3xl font-bold mb-2 text-green-standard">{twoFaEnabled ? "Disable" : "Enable"} Two-Factor Authentication</h1>
                        
                        {(
                            twoFaEnabled ? 
                            <div className="">
                                <p>
                                    <b>Steps:</b><br></br>
                                    <b>1.</b> Launch Google Authenticator<br></br>
                                    <b>2.</b> Enter OTP shown and hit "Disable 2FA"
                                </p>
                            </div>
                            :
                            <div className="">
                                <p>
                                    <b>Steps:</b><br></br>
                                    <b>1.</b> Launch Google Authenticator and scan QR code on the right<br></br>
                                    <b>2.</b> Enter OTP shown and hit "Enable 2FA"
                                </p>
                            </div>
                        )}
                        <div className="">
                            <input className="focus:outline-none px-4 py-1 my-4 h-11 rounded-full border border-grey-lightest md:w-11/12"
                                placeholder="OTP"
                                type="number"
                                onChange={e => setToken(e.target.value)} />
                        </div>
                        {(
                            twoFaEnabled ? 
                            <button className="rounded-xl px-5 border hover:shadow text-justify text-white-standard mt-2 h-8 bg-green-standard"
                                onClick={disable}>Disable 2FA
                            </button> 
                            :
                            <button className="rounded-xl px-5 border hover:shadow text-justify text-white-standard mt-2 h-8 bg-green-standard"
                                onClick={confirmTwoFaToken}>Enable 2FA
                            </button>
                        )}

                        {
                            (error ? <div className="pt-5 pb-2 text-red-standard">{error}</div> : <></>)
                        }
                        {
                            (enableSuccess ? <div className="pt-5 pb-2 text-green-standard">2FA enabled, try it in your next login!</div> : <></>)
                        }
                        {
                            (disableSuccess ? <div className="pt-5 pb-2 text-green-standard">2FA disabled!</div> : <></>)
                        }

                    </div>

                    <div>
                        <img className={(!twoFaEnabled) ? "mt-24 my-7 mx-24 transform scale-110" : "mt-16 my-7 transform scale-90"} src={(!twoFaEnabled) ? QRUrl : "/images/login.png"} alt="QR code" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TwoFa