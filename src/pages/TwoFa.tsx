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
                <div className="mt-32 p-10 bg-white-standard w-10/12 md:w-7/12 grid md:grid-cols-5 shadow-xxl shadow rounded-xxl">
                    <img className="transform scale-90 col-span-2 my-auto grid" src="/images/twoFactorAuthentication.png" alt="2fa" />
                    <div className="col-span-3 py-5">
                        <h1 className="text-4xl font-semibold mb-4 text-green-standard">{twoFaEnabled ? "Disable" : "Enable"} Two-Factor Authentication</h1>

                        <div className="grid grid-cols-2">
                            <div>
                                {(
                                    twoFaEnabled ?
                                        <div className="">
                                            <h1 className="text-green-standard font-semibold tracking-wide">Steps:</h1>
                                            <p className="text-base text-grey-standard">
                                                <b>1.</b>  Launch Google Authenticator<br></br>
                                                <b>2.</b>  Enter OTP shown and hit "Disable 2FA"
                                            </p>
                                        </div>
                                        :
                                        <div className="">
                                            <h1 className="text-green-standard font-semibold tracking-wide">Steps:</h1>
                                            <p className="text-base text-grey-standard">
                                                <b>1.</b>  Launch Google Authenticator and scan QR code on the right<br></br>
                                                <b>2.</b>  Enter OTP shown and hit "Enable 2FA"
                                            </p>
                                        </div>
                                )}
                            </div>
                            {
                                !twoFaEnabled && <img className="h-32 pl-8" src={QRUrl} alt="QR code" />
                            }
                            {/* <img className={(!twoFaEnabled) ? "h-32 pl-8" : "h-20 display-none"} src={(!twoFaEnabled) ? QRUrl : "/images/login.png"} alt="QR code" /> */}
                        </div>


                        <div className="pr-20">
                            <input className="focus:outline-none px-4 py-1 my-2 h-11 rounded-full border border-grey-lightest w-full"
                                placeholder="OTP"
                                type="number"
                                onChange={e => setToken(e.target.value)} />
                        </div>

                        {
                            (error ? <div className="pb-2 text-red-standard">{error}</div> : <></>)
                        }
                        {
                            (enableSuccess ? <div className="pb-2 text-green-standard">2FA enabled, try it in your next login!</div> : <></>)
                        }
                        {
                            (disableSuccess ? <div className="pb-2 text-green-standard">2FA disabled!</div> : <></>)
                        }
                        {(
                            twoFaEnabled ?
                                <button className="opacity-90 hover:opacity-100 rounded-full px-5 border hover:shadow text-justify text-white-standard mt-2 h-8 bg-green-standard"
                                    onClick={disable}>Disable 2FA
                                </button>
                                :
                                <button className=" opacity-90 hover:opacity-100 rounded-full px-5 border hover:shadow text-justify text-white-standard mt-2 h-8 bg-green-standard"
                                    onClick={confirmTwoFaToken}>Enable 2FA
                                </button>
                        )}



                    </div>

                </div>

            </div>
        </div>
    )
}

export default TwoFa