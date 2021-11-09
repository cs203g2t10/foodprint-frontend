import axios from 'axios'

const TWOFA_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/twofactor" : "http://localhost:8080/api/v1/twofactor";

class TwoFaService {
    headers = () => {
        const token = window.localStorage.getItem("token");
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    enable = () => {
        return axios.get(`${TWOFA_API_URL}/enable`, this.headers())
    }

    confirm = (token: string) => {
        return axios.post(`${TWOFA_API_URL}/confirm/${token}`, {}, this.headers())
    }

    disable = (token: string) => {
        return axios.post(`${TWOFA_API_URL}/disable/${token}`, {}, this.headers())
    }
}

export default new TwoFaService();