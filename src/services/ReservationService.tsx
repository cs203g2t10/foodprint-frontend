import axios from 'axios'

const RESERVATIONS_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/reservation" : "http://localhost:8080/api/v1/reservation";

class ReservationService {
    headers = () => {
        const token = window.localStorage.getItem("token");
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    makeReservation = async (date: Date, pax: Number, isVaccinated: Boolean, lineItems: any, restaurantId: Number) => {
        var lineItems2: any = [];
        lineItems.forEach((lineItem: any) => {
            var foodId = lineItem.food.foodId;
            var quantity = lineItem.quantity;
            lineItems2.push({
                foodId,
                quantity
            })
        })
        return axios.post(`${RESERVATIONS_REST_API_URL}`, {
            date,
            pax,
            isVaccinated,
            lineItems: lineItems2,
            restaurantId,
            status: "ONGOING"
        }, this.headers())
        .catch((error) => {
            return error.response;
        })
    }

    getReservation = (reservationId: Number) => {
        return axios.get(`${RESERVATIONS_REST_API_URL}/${reservationId}`, this.headers());
    }

    getUpcomingReservation = () => {
        return axios.get(`${RESERVATIONS_REST_API_URL}/upcoming`, this.headers());
    }

    getPastReservation = () => {
        return axios.get(`${RESERVATIONS_REST_API_URL}/past`, this.headers());
    }

    deleteReservation = (id:number) => {
        return axios.delete(RESERVATIONS_REST_API_URL+"/admin/"+id, this.headers());
    }
    
    getRestaurantReservations = (restaurantId: number, startDate: String, endDate: String, page: number) => {
        return axios.get(`${RESERVATIONS_REST_API_URL}/restaurant/${restaurantId}?after=${startDate}&before=${endDate}&p=${page}`, this.headers());
    }


}

export default new ReservationService();