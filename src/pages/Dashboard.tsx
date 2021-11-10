import { useState, useEffect } from 'react'
import LogInService, { UserDetails } from '../services/LogInService';
import Restricted from '../components/errors/Restricted';
import IngredientBreakdownSection from '../components/IngredientBreakdownSection';
import FoodBreakdownSection from '../components/FoodBreakdownSection';
import ReservationBreakdownSection from '../components/ReservationBreakdownSection';


const Dashboard = () => {
    const [restaurantId, setRestaurantId] = useState(0);
    const [isAuthorized, setAuthorized] = useState(false);

    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        if (userInfo.userAuthorities.includes("FP_MANAGER")) {
            setAuthorized(true);
        }
        if (userInfo.restaurantId == null) {
            console.log("User has no restaurant ID");
            return;
        }
        setRestaurantId(userInfo.restaurantId);
        console.log("Restaurant ID %d", userInfo.restaurantId);
    }, [])

    const getUserName = () => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        return `${userInfo.userFname}`;
    }

    if (!isAuthorized) {
        return (<Restricted />)
    }

    return (
        <div className="min-h-screen">
            <div className="bg-yellow-standard">
                <h1 className="text-5xl text-center font-bold text-green-standard tracking-wide pb-5">Dashboard</h1>
                <h1 className="text-lg text text-center text-grey-standard pb-8 bg-yellow-standard">
                    Hello {getUserName()}, observe the breakdown of food and ingredients below!
                </h1>
            </div>

            <h1 className="text-sm text-center text-grey-light mt-8">*Select the start and end dates to view the breakdowns in periods of time</h1>

            <div className="grid md:grid-cols-2 mx-20 my-8 gap-x-10">
                <IngredientBreakdownSection restaurantId={restaurantId} />
                <FoodBreakdownSection restaurantId={restaurantId} />
            </div>

            <ReservationBreakdownSection restaurantId={restaurantId}/>
        </div>
    )
}

export default Dashboard