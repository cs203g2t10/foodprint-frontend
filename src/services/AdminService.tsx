import axios from "axios";

const ADMIN_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/user" : "http://localhost:8080/api/v1/user";

class AdminService {
    headers = () => {
        const token = window.sessionStorage.getItem("token");
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    getAllUsers = () => {
        return axios.get(ADMIN_REST_API_URL+"/", this.headers());
    }

    deleteUser = (id:number) => {
        return axios.delete(ADMIN_REST_API_URL+"/"+id, this.headers());
    }

    updateUser = (id:number, email:any, firstName:any, lastName:any, roles:any) => {
        console.log(id, email, firstName, lastName, roles);
        const url = ADMIN_REST_API_URL+"/"+id;
        const requestBody = {
            id,
            email,
            firstName,
            lastName,
            roles
        };
        return axios.patch(url, requestBody, this.headers());
    }
}

export default new AdminService();