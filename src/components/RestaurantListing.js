import React from "react";
import RestaurantService from "../services/RestaurantService";

class RestaurantListing extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            restaurants: []
        }
    }

    componentDidMount() {
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
                <div className="flex justify-center grid grid-cols-1 mx-64">
                    <figure className="md:flex bg-gray-100 rounded-xl p-8 md:p-0 justify-center">
                        <img className="w-32 h-32 rounded-full ml-32 my-6" src="/images/macs.jpeg" alt="" width="384" height="512" />
                        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                            <blockquote>
                                <p className="text-lg font-semibold">
                                    Maccies by Mr Ronald
                                </p>
                            </blockquote>
                            <figcaption className="font-medium">
                                <div className="text-cyan-600">
                                    This is the bestest maccies eat my burgers
                                </div>
                                <div className="text-gray-500">
                                    Bedok Mall, 69
                                </div>
                            </figcaption>
                        </div>
                    </figure>

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