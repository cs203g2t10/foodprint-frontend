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
                <h1 className="text-center text-4xl pt-8 pb-2">Reservation #{params.id}</h1>
                <h1 className="text-center text-lg">We require you to make a small deposit amount of 20% of your total bill</h1>
                <h1 className="text-center text-lg">Total bill: ${(reservationDetails.price / 100).toFixed(2)}</h1>
                <h1 className="text-center text-lg pb-5">Deposit (20% total): ${(reservationDetails.price / 100 / 5).toFixed(2)}</h1>
                {
                    (paid ?
                        <div className="grid grid-cols-1 mx-48 px-36 pb-10 pt-10 bg-yellow-standard rounded shadow">
                            <h1 className="text-center pb-5 ">You have already paid!</h1>
                            <div className="flex justify-center items-center mx-20">
                                <Link to={"/"} className="mx-auto text-center bg-green-standard text-white-standard px-7 py-2 rounded-xl shadow-md hover:shadow-lg">Back to Home</Link>
                                <Link to={"/"} className="mx-auto text-center bg-green-standard text-white-standard px-7 py-2 rounded-xl shadow-md hover:shadow-lg">Refund</Link>
                            </div>

                        </div>
                        :
                        <Elements stripe={stripeTestPromise}>
                            <PaymentForm reservationId={params.id} amount={reservationDetails.price} />
                        </Elements>)
                }

            </div>
        </>


    )
}

export default Payment
