import axios from 'axios'

const RESTAURANTS_REST_API_URL = "http://localhost:8080/api/v1/restaurant"

class RestaurantService {
    getRestaurants() {
        var token = window.sessionStorage.getItem("token");
        return axios.get(RESTAURANTS_REST_API_URL + "/all", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

    }
}

export default new RestaurantService();