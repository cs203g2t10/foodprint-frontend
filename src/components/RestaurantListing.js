import React from "react";
import RestaurantService from "../services/RestaurantService";
import LogInService from "../services/LogInService";

class RestaurantListing extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            restaurants: []
        }
    }

    componentDidMount() {
        LogInService.logIn().then((response) => {
            console.log(response.data.token)
            window.sessionStorage.setItem("token", response.data.token)
        })

        RestaurantService.getRestaurants().then((response) => {
            this.setState({
                restaurants: response.data
            })
            console.log(response.data)
        })

        
    }

    render() {
        return (
            <div>
                <div className="flex justify-center grid grid-cols-1">
                    <div className="grid grid-cols-3 gap-x-48 text-center text-xl">
                        <div>Name</div>
                        <div>Description</div>
                        <div>Location</div>
                    </div>
                    
                    {
                        this.state.restaurants.map(
                            restaurant =>
                                <div className="grid grid-cols-3 gap-x-48 text-center" key={restaurant.restaurantId}>
                                    <div> {restaurant.restaurantName} </div>
                                    <div> {restaurant.restaurantDesc} </div>
                                    <div> {restaurant.restaurantLocation}</div>
                                </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default RestaurantListing;