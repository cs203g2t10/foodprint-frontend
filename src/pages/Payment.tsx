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
        <>
            <div>
                <div className="bg-yellow-standard">
                    <div className=" place-self-center grid">
                        <img className="h-32 mx-auto pt-7" src="/images/burgers.png" alt="burger" />
                    </div>
                    <h1 className="flex items-center justify-center text-4xl font-bold tracking-wide">Reservation no. {params.id}</h1>
                    <div className="pb-8"></div>
                </div>

                <div className="grid grid-cols-7 gap-x-12 py-16 px-40">
                    <div className="col-span-3 bg-white-dirtyWhite rounded-xxl shadow:md h-auto p-8">
                        <h1 className="flex items-center justify-center text-3xl font-bold tracking-wide text-green-standard pb-2">Your Order</h1>
                        <div className="overflow-y-auto max-h-64">
                            {
                                reservationDetails.lineItems?.map((lineItem: any) => {
                                    let imageUrl = "/images/forkspoon.jpg"
                                    if (lineItem.picture) {
                                        imageUrl = lineItem.picture.url
                                    }
                                    return <div key={lineItem.reservationId} >
                                        <div className="mx-8 grid grid-cols-7 bg-white-standard rounded-xl justify-center items-center py-2 mb-3 ">
                                            <div className="col-span-2 ml-8">
                                                <img src={imageUrl} className=" w-14 h-14 shadow-md rounded-full" alt="food pic" />
                                            </div>
                                            <div className="col-span-4 mx-5">
                                                <h1 className="text-grey-dark text-xl">{lineItem.foodName}</h1>
                                            </div>
                                            <h1 className="text-grey-light text-sm">x {lineItem.quantity}</h1>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        
                        <div className="grid grid-cols-4 mx-8">
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
                    
                    <div className="col-span-4 bg-white-dirtyWhite rounded-xxl shadow:md h-auto p-8">
                    <h1 className="flex items-center justify-center text-3xl font-bold tracking-wide text-green-standard pb-5">Payment Information</h1>
                        <h1 className="text-center text-base text-grey-standard">We require you to make a small deposit amount</h1>
                        <h1 className="text-center text-base text-grey-standard pb-8">of 20% of your total bill</h1>
                        {
                            (paid ?
                                <div className="">
                                    <h1 className="text-center pb-5 ">You have already paid!</h1>
                                    <div className="flex justify-center items-center gap-x-10">
                                        <Link to={"/"} className="text-center bg-green-standard text-white-standard rounded-xl shadow-md hover:shadow-lg px-3 py-1">Back to Home</Link>
                                        <Link to={"/"} className=" text-center bg-green-standard text-white-standard  rounded-xl shadow-md hover:shadow-lg px-3 py-1">Refund</Link>
                                    </div>

                                </div>
                                :
                                <Elements stripe={stripeTestPromise}>
                                    <PaymentForm reservationId={params.id} amount={reservationDetails.price} />
                                </Elements>)
                        }
                    </div>
                </div>

            </div>
        </>


    )
}

export default Payment
