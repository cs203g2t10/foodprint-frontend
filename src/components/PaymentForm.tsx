import React, { useEffect, useState } from 'react'

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import PaymentService from '../services/PaymentService'
import "../css/paymentform.css"

const CARD_OPTIONS: any = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#F3E8C9",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": {
                color: "#F3E8C9"
            },
            "::placeholder": {
                color: "#F3E8C9"
            }
        },
        invalid: {
            iconColor: "#F3E8C9", 
            color: "#F3E8C9"
        }
    }
};

const PaymentForm = (props: any) => {

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);

    const [amount, setAmount] = useState(0)

    useEffect(() => {
        setAmount(props.amount * 1/5)
    }, [props])

    const stripe = useStripe()
    const elements = useElements()

    const handleChange = async (event: any) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setProcessing(true)

        if (!stripe || !elements) {
            // Disable form submission until Stripe.js has loaded.
            return;
        }

        try {
            const card = elements.getElement(CardElement);

            if (card == null) {
                setProcessing(false);
                setError("Card is null");
                return;
            }

            const result = await stripe.createToken(card);

            if (result.error) {
                console.log(result.error.message)
            } else {
                console.log('token is', result.token.id);
            }

            if (result.token === undefined) {
                setProcessing(false);
                setError("Token is undefined");
                return;
            }

            const response = await PaymentService.makePayment(props.reservationId, amount, result.token.id);

            if (response.data.status === "succeeded") {
                console.log("Successful payment")
                setSuccess(true)
                setProcessing(false)
            } else {
                var message = response.data.message.split(";")[0];
                console.log(message)
                setError(message)
                setProcessing(false)
            }

        } catch (error: any) {
            console.log("Error", error)
            setError(error.message)
            setProcessing(false)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="Form py-10">
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
                            'Pay $ ' + (amount / 100).toFixed(2)
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
