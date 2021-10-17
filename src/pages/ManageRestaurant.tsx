import React, { useEffect, useState } from 'react'
import Restricted from '../components/errors/Restricted';
import LogInService, { UserDetails } from '../services/LogInService';
import RestaurantService from '../services/RestaurantService';

const ManageRestaurant = () => {

    const [isAuthorized, setAuthorized] = useState(false);
    const [restaurantId, setRestaurantId] = useState<number>(0);
    const [restaurantDetails, setRestaurantDetails] = useState<any>([]);

    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        if (userInfo.userAuthorities.includes("FP_MANAGER")) {
            setAuthorized(true);
        } else {
            return;
        }
        setRestaurantId(userInfo.restaurantId);
        
    }, [isAuthorized])

    useEffect(() => {
        if (restaurantId===0) {
            return;
        }
        RestaurantService.getRestaurant(restaurantId).then((response) => {
            console.log(response.data);
            setRestaurantDetails(response.data)
        })
    }, [restaurantId])

    return (
        isAuthorized ? 
        <div>
            <h1>{restaurantDetails.restaurantName}</h1>
            <h1>{restaurantDetails.restaurantDesc}</h1>
            <h1>{restaurantDetails.restaurantLocation}</h1>
        </div>
        :<Restricted/>
    )
}

export default ManageRestaurant
