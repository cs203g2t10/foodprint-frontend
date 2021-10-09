import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm';
import { useParams } from 'react-router';
import ReservationService from '../services/ReservationService';
import { Link } from 'react-router-dom';

const Payment = () => {

    let params = useParams();

    const [reservationDetails, setReservationDetails] = useState([]);
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
                        {/* <img className=" h-28 pt-7" src="/images/hotdog.png" alt="burger" />
                        <img className=" h-28 pt-7" src="/images/cheese.png" alt="burger" />
                        <img className="h-28 pt-7" src="/images/bacon.png" alt="burger" /> */}
                        <img className="h-32 mx-auto pt-7" src="/images/burgers.png" alt="burger" />
                    </div>
                    <h1 className="flex items-center justify-center text-4xl font-bold tracking-wide">Reservation no. {params.id}</h1>
                    <div className="pb-8"></div>
                </div>

                <div className="grid grid-cols-2 py-24 px-14">
                    <div>
                        <h1 className="text-center text-lg">Total bill: ${(reservationDetails.price / 100).toFixed(2)}</h1>
                        <h1 className="text-center text-lg pb-5">Deposit (20% total): ${(reservationDetails.price / 100 / 5).toFixed(2)}</h1>

                        <div className="overflow-y-auto max-h-72">
                            
                        </div>
                    </div>
                    
                    <div className="bg-white-dirtyWhite rounded-xxl shadow:md h-auto p-8">
                    <h1 className="flex items-center justify-center text-3xl font-bold tracking-wide text-green-standard pb-2">Payment Information</h1>
                        <h1 className="text-center text-base text-grey-standard pb-8">We require you to make a small deposit amount of 20% of your total bill</h1>
                        {
                            (paid ?
                                <div className=" bg-yellow-standard rounded shadow">
                                    <h1 className="text-center pb-5 ">You have already paid!</h1>
                                    <div className="flex justify-center items-center ">
                                        <Link to={"/"} className="text-center bg-green-standard text-white-standard rounded-xl shadow-md hover:shadow-lg">Back to Home</Link>
                                        <Link to={"/"} className=" text-center bg-green-standard text-white-standard  rounded-xl shadow-md hover:shadow-lg">Refund</Link>
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
