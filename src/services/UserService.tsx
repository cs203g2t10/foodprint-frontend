import axios from "axios";

const USER_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://arest.foodprint.worksapi/v1/user" : "http://localhost:8080/api/v1/user";

class UserService {
    headers = () => {
        const token = window.localStorage.getItem("token");
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    getFavRestaurant = async () => {
        const url = USER_REST_API_URL + "/favouriteRestaurants";
        return await axios.get(url, this.headers());
    }

    deleteFavRestaurant = async (restaurantId: number) => {
        const url = `${USER_REST_API_URL}/favourite/${restaurantId}`;
        return await axios.delete(url, this.headers());
    }

    addRestaurantToFav = async (restaurantId: number) => {
        const url = `${USER_REST_API_URL}/favourite/${restaurantId}`;
        return await axios.post(url, null, this.headers());
    }

    updateUserFirstName = (id: number, firstName: any) => {
        const url = USER_REST_API_URL + "/" + id;
        const requestBody = {
            firstName
        };
        return axios.patch(url, requestBody, this.headers());
    }

    updateUserLastName = (id: number, lastName: any) => {
        const url = USER_REST_API_URL + "/" + id;
        const requestBody = {
            lastName
        };
        return axios.patch(url, requestBody, this.headers());
    }

    updateUserEmail = (id: number, email: any) => {
        const url = USER_REST_API_URL + "/" + id;
        const requestBody = {
            email,
        };
        return axios.patch(url, requestBody, this.headers());
    }
}

export default new UserService();