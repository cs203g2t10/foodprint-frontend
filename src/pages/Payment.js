import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from '../components/PaymentForm';
import { useParams } from 'react-router';

const Payment = () => {

    let params = useParams();

    const STRIPE_PUBLIC_KEY = "pk_test_51JWxIgJomapQlvkOKjy27IVPV75f4t6LyEU6NxqtjawVAJTwS5s3ghrQevyGrUXI3vs5RHGGkEfyHbGU0aazJyik00TbOClJ64";

    const stripeTestPromise = loadStripe(STRIPE_PUBLIC_KEY);

    return (
        <>
            <div>
                <h1 className="text-center text-4xl pt-12">Reservation #{params.id}</h1>
                <h1 className="text-center text-lg pb-5">We require you to make a small deposit amount of 20% of your total bill</h1>
                <Elements stripe = {stripeTestPromise}>
                    <PaymentForm reservationId = {params.id}/>
                </Elements>
            </div>
        </>
    )
}

export default Payment
