import axios from 'axios'

const RESTAURANTS_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/restaurant" : "http://localhost:8080/api/v1/restaurant";

class RestaurantService {
    headers = () => {
        const token = window.sessionStorage.getItem("token");
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    getRestaurants = () => {
        return axios.get(`${RESTAURANTS_REST_API_URL}`, this.headers());
    }

    getRestaurant = (restaurantId: number) => {
        return axios.get(`${RESTAURANTS_REST_API_URL}/${restaurantId}`, this.headers());
    }

    getFood = (restaurantId: number, foodId: number) => {
        return axios.get(`${RESTAURANTS_REST_API_URL}/${restaurantId}/food/${foodId}`, this.headers());
    }

    searchRestaurant = (searchQuery: String) => {
        return axios.get(`${RESTAURANTS_REST_API_URL}/search`, {
            headers:  this.headers().headers,
            params: {
                q: searchQuery
            }
        })
    }

}

export default new RestaurantService();