import axios from "axios";

const PAYMENT_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/charge" : "http://localhost:8080/api/v1/charge";

class PaymentService {
    headers = () => {
        const token = window.sessionStorage.getItem("token");
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    makePayment = (amount: number, id: string, token:any) => {
        return axios.post(`${PAYMENT_REST_API_URL}/`, {
            description: 'test',
            amount,
            currency: 'EUR',
            stripeEmail: 'youcanfinddaryl@gmail.com',
            stripeToken: token
        }, this.headers()).catch((error) => {
            console.log(error)
        })
    }

    // makePayment = (paymentData: any) => {
    //     return axios.post(`${PAYMENT_REST_API_URL}/`, JSON.stringify(paymentData), this.headers())
    // }

}

export default new PaymentService();