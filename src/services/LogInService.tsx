import axios from 'axios'
import jwt_decode from 'jwt-decode'

const LOGIN_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/auth" : "http://localhost:8080/api/v1/auth";

type UserDetails = {
    email: String
    userFname: String
    userLname: String
    userAuthorities: String[]
    restaurantId: any
};

class LogInService {
    userLogIn = (email: string, password: string) => {
        const requestBody = {
            "email": email,
            "password": password
        };
        return axios.post(LOGIN_REST_API_URL+"/login", requestBody)
        .catch((error)=>{
            console.log(error.response);
            return error.response;
        });
    }

    userRegister = (email: string, password: string, firstName: string, lastName: string) => {
        const requestBody = {
            "email": email,
            "password": password,
            "firstName" : firstName,
            "lastName": lastName
        };
        return axios.post(LOGIN_REST_API_URL+"/register", requestBody)
        .catch((error) => {
            console.log(error.response);
            return error.response;
        });
    }

    // Requires API call to backend
    userWhoami = () => {
        const token = window.localStorage.getItem("token");
        const settings = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        return axios.get(LOGIN_REST_API_URL+"/whoami", settings);
    }

    userConfirmToken = (emailToken:any) => {
        return axios.get(LOGIN_REST_API_URL+"/register/confirm/"+emailToken);
    }

    // Does not require API call to backend since JWT stores user properties too
    getUserDetails = () => {
        const token : string | null = window.localStorage.getItem("token");
        if (typeof token !== "string") {
            return {
                email: "",
                userFname: "",
                userLname: "",
                userAuthorities: [],
                restaurantId: null
            }
        }

        let decodedHeader : any = jwt_decode(token, { header: true });
        console.log(decodedHeader);
        let userDetails : UserDetails = {
            email: decodedHeader.email,
            userFname: decodedHeader.userFname,
            userLname: decodedHeader.userLname,
            userAuthorities: decodedHeader.userAuthorities,
            restaurantId: decodedHeader.restaurantId
        }
        return userDetails;
    }
}

export default new LogInService();
export type { UserDetails };