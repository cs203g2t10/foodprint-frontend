import React, { useState } from 'react'

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import PaymentService from '../services/PaymentService'
import "../css/paymentform.css"

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
                color: "#fce883"
            },
            "::placeholder": {
                color: "#87bbfd"
            }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
};

const PaymentForm = () => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);

    const [amount, setAmount] = useState(6900)

    const stripe = useStripe()
    const elements = useElements()

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)

        if (!stripe || !elements) {
            // Disable form submission until Stripe.js has loaded.
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        if (!error) {
            try {
                const { id } = paymentMethod
                const response = await PaymentService.makePayment(amount, id)
                if (response.data.success) {
                    console.log("Successful payment")
                    setSuccess(true)
                }
            } catch (error) {
                console.log("Error", error)
                setError(error.message)
                setProcessing(false)
            }
        } else {
            console.log(error.message)
            setError(error.message)
            setProcessing(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="Form mx-28 px-36 pb-20 pt-10 bg-yellow-standard rounded shadow">
                <h1 className="text-center pb-10">Please fill up your payment details below</h1>
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS} onChange={handleChange}></CardElement>
                    </div>
                </fieldset>
                <button className="SubmitButton" disabled={processing || disabled || success}>
                    <span id="button-text">
                        {processing ? (
                            < div className="spinner" id="spinner"></div>
                        ) : (
                            'Pay $ '+ amount / 100
                        )}
                    </span>
                </button>
                {error && (
                    < div className="card-error" role="alert">
                        {error}
                    </div>
                )}
            </form>
            {
                (success) ?
                    <div className="h-48 w-48 border py-10">
                        <h1 className="text-6xl text-center"> Your payment is successful!</h1>
                    </div>
                    : <></>
            }


        </>
    )
}

export default PaymentForm
