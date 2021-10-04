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

    // function stripeTokenHandler(token) {
    //     const paymentData = {token: token.id};

    //     // const response = await fetch('/charge', {
    //     //   method: 'POST',
    //     //   headers: {
    //     //     'Content-Type': 'application/json'
    //     //   },
    //     //   body: JSON.stringify(paymentData),
    //     // });
    //     console.log(paymentData)
    //     // const response = PaymentService.makePayment(paymentData);
    //     // Return and display the result of the charge.
    //     // return response;
    //   }

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
                console.log('id is ', id)
                // console.log('the id is', id)
                // console.log(paymentMethod)

                const card = elements.getElement(CardElement);
                const result = await stripe.createToken(card);
                // console.log(result)
                if (result.error) {
                    console.log(result.error.message)
                } else {
                    console.log('token is', result.token.id);
                    // stripeTokenHandler(result.token);
                }

                const response = await PaymentService.makePayment(amount, id, result.token.id);
                console.log(response)
                if (response.data.status === "succeeded") {
                    console.log("Successful payment")
                    setSuccess(true)
                    setProcessing(false)
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
                            'Pay $ ' + amount / 100
                        )}
                    </span>
                </button>
                {error && (
                    < div className="card-error" role="alert">
                        {error}
                    </div>
                )}
                {
                    (success) ?
                        <div className="Result">
                            <h1 className="ResultTitle"> Congratulations!</h1>
                            <h1 className="ResultMessage"> Your payment is successful!</h1>
                        </div>
                        : <></>
                }
            </form>



        </>
    )
}

export default PaymentForm
