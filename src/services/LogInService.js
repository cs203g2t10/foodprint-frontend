import axios from 'axios'
import jwt_decode from 'jwt-decode'

const LOGIN_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/auth" : "http://localhost:8080/api/v1/auth";

class LogInService {
    userLogIn = (email, password) => {
        const requestBody = {
            "email": email,
            "password": password
        };
        return axios.post(LOGIN_REST_API_URL+"/login", requestBody);
    }

    userRegister = (email, password, firstName, lastName) => {
        const requestBody = {
            "email": email,
            "password": password,
            "firstName" : firstName,
            "lastName": lastName
        };
        return axios.post(LOGIN_REST_API_URL+"/register", requestBody);
    }

    // Requires API call to backend
    userWhoami = () => {
        const token = window.sessionStorage.getItem("token");
        const settings = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return axios.get(LOGIN_REST_API_URL+"/whoami", settings);
    }

    // Does not require API call to backend since JWT stores user properties too
    getUserDetails = () => {
        const token = window.sessionStorage.getItem("token");
        var decodedHeader = jwt_decode(token, { header: true, payload: true });
        return decodedHeader
    }
}

export default new LogInService();