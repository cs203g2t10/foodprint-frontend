import axios from 'axios'
import jwt_decode from 'jwt-decode'

const TWOFA_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/twofactor" : "http://localhost:8080/api/v1/twofactor";

class TwoFaService {
    enable = () => {
        return axios.get(`${TWOFA_API_URL}/enable`)
    }
}

export default new TwoFaService();