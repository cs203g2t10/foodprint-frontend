import axios from "axios";

const ADMIN_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/user" : "http://localhost:8080/api/v1/user";

class UserService {
    headers = () => {
        const token = window.localStorage.getItem("token");
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    getFavRestaurant= async () => {
        const url = ADMIN_REST_API_URL+"/favouriteRestaurants";
        return await axios.get(url, this.headers());
    }
}

export default new UserService();