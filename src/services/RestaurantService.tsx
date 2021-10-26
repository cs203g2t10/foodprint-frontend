import axios from 'axios'

const RESTAURANTS_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/restaurant" : "http://localhost:8080/api/v1/restaurant";

class RestaurantService {
    headers = () => {
        const token = window.localStorage.getItem("token");
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

    getAllFood = (restaurantId: number) => {
        return axios.get(`${RESTAURANTS_REST_API_URL}/${restaurantId}/food`, this.headers());
    }

    getAllIngredients = (restaurantId: number, page: number) => {
        return axios.get(`${RESTAURANTS_REST_API_URL}/${restaurantId}/ingredient?p=${page}`, this.headers());
    }

    // Manager: Add new food to his own restaurant
    createFood = (restaurantId: number, name:any, desc:any, price:any, ingredientQty:any) => {
        const requestBody = {
            foodName : name,
            foodDesc: desc,
            foodPrice: price,
            ingredientQuantityList: ingredientQty
        }
        return axios.post(`${RESTAURANTS_REST_API_URL}/${restaurantId}/food`,requestBody, this.headers());
    }

    // Manager: Edit food details
    editFood = (restaurantId: number, foodId: number, name:any, desc:any, price:any, ingredientQty:any) => {
        console.log(ingredientQty);
        const requestBody = {
            foodName : name,
            foodDesc: desc,
            foodPrice: price,
            foodIngredientQuantity: ingredientQty
        }
        return axios.patch(`${RESTAURANTS_REST_API_URL}/${restaurantId}/food/${foodId}`, requestBody, this.headers());
    }

    managerGetAllIngredients = (restaurantId: number) => {
        return axios.get(`${RESTAURANTS_REST_API_URL}/${restaurantId}/ingredient/all`, this.headers());
    }

    createIngredient = (restaurantId: number, name: string, desc: string, units: string) => {
        return axios.post(`${RESTAURANTS_REST_API_URL}/${restaurantId}/ingredient`, {
            ingredientName: name,
            ingredientDesc: desc,
            units: units
        } ,this.headers())
    }

    updateIngredient = (restaurantId: number, id: number, name: string, desc: string, units:string) => {
        return axios.patch(`${RESTAURANTS_REST_API_URL}/${restaurantId}/ingredient/${id}`, {
            ingredientName: name,
            ingredientDesc: desc,
            units: units
        }, this.headers());
    }

    deleteIngredient = (restaurantId: number, id: number) => {
        return axios.delete(`${RESTAURANTS_REST_API_URL}/${restaurantId}/ingredient/${id}`, this.headers());
    }

    searchRestaurant = (searchQuery: String, sortBy: String = "restaurantName", sortDesc : Boolean = false) => {
        return axios.get(`${RESTAURANTS_REST_API_URL}/search`, {
            headers:  this.headers().headers,
            params: {
                q: searchQuery,
                sortBy: sortBy,
                sortDesc: sortDesc
            }
        })
    }

}

export default new RestaurantService();