import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm';
import { useParams } from 'react-router';
import ReservationService from '../services/ReservationService';
import { Link } from 'react-router-dom';

const Payment = () => {

    let params = useParams<any>();

    const [reservationDetails, setReservationDetails] = useState<any>([]);
    const [paid, setPaid] = useState(false);

    useEffect(() => {
        ReservationService.getReservation(params.id).then((response) => {
            setReservationDetails(response.data);
            if (response.data.status === 'PAID') {
                console.log("object")
                setPaid(true)
            }
            console.log('Response: ', response.data);
        })
    }, [params])

    const STRIPE_PUBLIC_KEY = "pk_test_51JWxIgJomapQlvkOKjy27IVPV75f4t6LyEU6NxqtjawVAJTwS5s3ghrQevyGrUXI3vs5RHGGkEfyHbGU0aazJyik00TbOClJ64";

    const stripeTestPromise = loadStripe(STRIPE_PUBLIC_KEY);


    return (
        <div>
            <div className="bg-yellow-standard">
                <div className="place-self-center grid">
                    <img className="md:h-32 h-24 mx-auto pt-7" src="/images/burgers.png" alt="burger" />
                </div>
                <h1 className="flex items-center justify-center md:text-4xl text-2xl font-bold tracking-wide">Reservation no. {params.id}</h1>
                <div className="md:pb-8 pb-4"></div>
            </div>

            <div className="md:grid md:grid-cols-7 md:gap-x-12 md:py-16 py-12 md:px-40">
                <div className="col-span-3 bg-white-dirtyWhite rounded-xxl shadow-md md:h-auto md:p-8 p-8 md:mb-0 mb-10 md:mx-0 mx-2">
                    <h1 className="md:mx-10 mx-4 text-3xl font-bold tracking-wide text-green-standard pb-2">Your Order</h1>
                    <div className="overflow-y-auto md:max-h-64 max-h-48 md:mb-0 mb-4">
                        {
                            reservationDetails.lineItems?.map((lineItem: any) => {
                                let imageUrl = "/images/forkspoon.jpg"
                                if (lineItem.picture) {
                                    imageUrl = lineItem.picture.url
                                }
                                return <div key={lineItem.reservationId} >
                                    <div className="md:mx-8 grid grid-cols-7 bg-white-standard rounded-xl justify-center items-center py-2 mb-3 ">
                                        <div className="col-span-2 md:ml-8 ml-3">
                                            <img src={imageUrl} className=" w-14 h-14 shadow-md rounded-full object-cover" alt="food pic" />
                                        </div>
                                        <div className="col-span-4 md:mx-5">
                                            <h1 className="text-grey-dark text-base">{lineItem.foodName}</h1>
                                        </div>
                                        <h1 className="text-grey-light text-sm">x {lineItem.quantity}</h1>
                                    </div>
                                </div>
                            })
                        }
                    </div>

                    <div className="grid grid-cols-4 md:mx-8 mx-4">
                        <div className="col-span-2">
                            <div className="gap-x-2 text-md text-green-standard">Total bill:</div>
                            <div className="gap-x-2 text-md text-green-standard">Deposit (20% total):</div>
                        </div>
                        <div className="col-span-2 mx-3 text-right">
                            <h1 className="gap-x-2 text-base text-grey-standard">${(reservationDetails.price / 100).toFixed(2)}</h1>
                            <h1 className="gap-x-2 text-base text-grey-standard">${(reservationDetails.price / 100 / 5).toFixed(2)}</h1>
                        </div>
                        <div className="col-span-4 pt-3 text-center text-gray-400">*Prices exclusive of GST and Service Charge</div>
                    </div>

                </div>

                <div className="col-span-4 bg-white-dirtyWhite rounded-xxl shadow-md h-auto p-8 md:mx-0 mx-2">
                    <h1 className="mx-6 text-3xl font-bold tracking-wide text-green-standard pb-5">Payment Information</h1>

                    {
                        (paid ?
                            <div className="mx-6">
                                <h1 className="text-center pb-4 text-green-standard">You have already paid!</h1>
                                <div className="flex justify-center items-center md:gap-x-10 gap-x-4">
                                    <Link to={"/"} className="text-center bg-green-standard text-white-standard rounded-lg shadow-md hover:shadow-lg px-6 py-1">Back to Home</Link>
                                    <Link to={"/profile"} className=" text-center bg-green-standard text-white-standard  rounded-lg shadow-md hover:shadow-lg px-6 py-1">Back to Profile</Link>
                                </div>
                            </div>
                            :
                            <>
                                <h1 className="text-base text-grey-standard mx-6">We require you to make a small deposit of 20% of your total bill</h1>
                                <Elements stripe={stripeTestPromise}>
                                    <PaymentForm reservationId={params.id} amount={reservationDetails.price} />
                                </Elements>
                            </>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Payment
