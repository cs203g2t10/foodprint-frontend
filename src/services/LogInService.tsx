import axios from 'axios'
import jwt_decode from 'jwt-decode'

const LOGIN_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://rest.foodprint.works/api/v1/auth" : "http://localhost:8080/api/v1/auth";

type UserDetails = {
    email: string
    userId: number
    userFname: string
    userLname: string
    userAuthorities: String[]
    restaurantId: number | null
    vaccinationName: string | null
    vaccinationDob: string | null
};

class LogInService {
    user2Fa = async (email: string) => {
        return axios.get(`${LOGIN_REST_API_URL}/checkUser2FA/${email}`)
            .catch((error) => {
                console.log(error.response);
                return error.response;
            });
    }

    userLogIn = async (email: string, password: string, token: string) => {
        const requestBody = {
            email,
            password,
            token
        };
        return axios.post(LOGIN_REST_API_URL + "/login", requestBody)
            .catch((error) => {
                console.log(error.response);
                return error.response;
            });
    }

    userRegister = async (email: string, password: string, firstName: string, lastName: string) => {
        const requestBody = {
            email,
            password,
            firstName,
            lastName
        };
        return axios.post(LOGIN_REST_API_URL + "/register", requestBody)
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
        return axios.get(LOGIN_REST_API_URL + "/whoami", settings);
    }

    userConfirmToken = (emailToken: any) => {
        return axios.get(LOGIN_REST_API_URL + "/register/confirm/" + emailToken);
    }

    // Does not require API call to backend since JWT stores user properties too
    getUserDetails = () : UserDetails => {
        const token: string | null = window.localStorage.getItem("token");
        if (typeof token !== "string") {
            return {
                email: "",
                userId: 0,
                userFname: "",
                userLname: "",
                userAuthorities: [],
                restaurantId: null,
                vaccinationName: null,
                vaccinationDob: null
            }
        }

        let decodedHeader: UserDetails | null = null;
        let email: string = "";
        try {
            decodedHeader = jwt_decode(token, { header: true });
            var decoded : any = jwt_decode(token);
            email = decoded.sub;
        } catch {
            console.log("Problem.")
        }

        if (decodedHeader === null) {
            return {
                email: "",
                userId: 0,
                userFname: "",
                userLname: "",
                userAuthorities: [] as String[],
                restaurantId: null,
                vaccinationName: null,
                vaccinationDob: null
            }
        }

        let userDetails: UserDetails = {
            email: email,
            userId: decodedHeader.userId,
            userFname: decodedHeader.userFname,
            userLname: decodedHeader.userLname,
            userAuthorities: decodedHeader.userAuthorities,
            restaurantId: decodedHeader.restaurantId,
            vaccinationName: decodedHeader.vaccinationName,
            vaccinationDob: decodedHeader.vaccinationDob
        }
        return userDetails;
    }
}

export default new LogInService();
export type { UserDetails };