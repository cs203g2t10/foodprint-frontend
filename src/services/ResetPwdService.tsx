import axios from 'axios'
import jwt_decode from 'jwt-decode'

const RESETPWD_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/user/auth" : "http://localhost:8080/api/v1/user/auth";

type ResetPwdDetails = {
    email: String
    password: String
};

class ResetPwdService {
    requestResetPwd = (email: string) => {
        const requestBody = {
            "email": email
        };
        return axios.post(RESETPWD_REST_API_URL+"/requestResetPwd", requestBody);
    }

    // Does not require API call to backend since JWT stores user properties too
    getResetPwdDetails = () => {
        const token : string | null = window.localStorage.getItem("token");
        if (typeof token !== "string") {
            return {
                email: "",
            }
        }

        let decodedHeader : any = jwt_decode(token, { header: true });
        console.log(decodedHeader);
        let resetPwdDetails : ResetPwdDetails = {
            email: decodedHeader.email,
            password: decodedHeader.password
        }
        return resetPwdDetails;
    }

    resetPwd = (emailToken:any, newPassword: string) => {
        const requestBody = {
            "password": newPassword
        };
        return axios.post(RESETPWD_REST_API_URL+"/resetpwd/"+emailToken, requestBody);
    }
}

export default new ResetPwdService();
export type { ResetPwdDetails };