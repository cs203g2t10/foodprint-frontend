import axios from "axios";

const PAYMENT_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/payment" : "http://localhost:8080/api/v1/payment";

class PaymentService {
    headers = () => {
        const token = window.sessionStorage.getItem("token");
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    makePayment = (amount: number, id: number) => {
        return axios.post(`${PAYMENT_REST_API_URL}`, {
            amount,
            id
        }, this.headers())
    }

}

export default new PaymentService();