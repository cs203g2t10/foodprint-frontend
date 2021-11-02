import axios from "axios";

const PAYMENT_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/charge" : "http://localhost:8080/api/v1/charge";

class PaymentService {
    headers = () => {
        const token = window.localStorage.getItem("token");
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    makePayment = async (reservationId : number, amount: number, token:any) => {
        return axios.post(`${PAYMENT_REST_API_URL}/`, {
            reservationId,
            description: `${'Deposit payment for Reservation with id: ' + reservationId}`,
            amount,
            currency: 'SGD',
            stripeEmail: 'youcanfinddaryl@gmail.com',
            stripeToken: token
        }, this.headers())
        .catch((error) => {
            console.log(error.response);
            return error.response;
        })
    }
}

export default new PaymentService();