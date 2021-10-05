import axios from 'axios'

const RESERVATIONS_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/reservation" : "http://localhost:8080/api/v1/reservation";

class ReservationService {
    headers = () => {
        const token = window.sessionStorage.getItem("token");
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    makeReservation = (date: Date, pax: Number, isVaccinated: Boolean, lineItems: any, restaurantId: Number) => {
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
}

export default new ReservationService();