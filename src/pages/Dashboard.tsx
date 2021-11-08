import React, { useState, useEffect } from 'react'
import RestaurantService from '../services/RestaurantService';
import LogInService, { UserDetails } from '../services/LogInService';
import IngredientBreakdownListing from '../components/IngredientBreakdownListing';
import Restricted from '../components/errors/Restricted';
import moment from 'moment';


const Dashboard = () => {
    const [restaurantId, setRestaurantId] = useState(0);

    const [isAuthorized, setAuthorized] = useState(false);
    const [ingredientsBetween, setIngredientsBetween] = useState<any[]>([])
    const [foodBetween, setFoodBetween] = useState<any>({})

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

    useEffect(() => {
        if (restaurantId === 0) {
            return;
        }

        const start = moment().format("YYYY-MM-DD");
        const end = moment().add(7, 'days').format("YYYY-MM-DD");

        RestaurantService.getIngredientsBetween(restaurantId, start, end).then((response) => {
            console.log(response)
            setIngredientsBetween(response.data)
            console.log(response.data)
        })

        RestaurantService.getFoodBetween(restaurantId, start, end).then((response) => {
            console.log(response)
            setFoodBetween(response.data)
            console.log(response.data)
        })

    }, [restaurantId])

    if (!isAuthorized) {
        return (<Restricted />)
    }

    return (
        <div className="min-h-screen">
            <div className="bg-yellow-standard">
                <h1 className="text-5xl text-center font-bold text-green-standard tracking-wide pb-5">Dashboard</h1>
            </div>

            <div className="grid md:grid-cols-2 mx-20 my-8 gap-x-10">
                <div className="bg-white-dirtyWhite rounded-xxl p-7">
                    <h1 className="text-green-standard text-xl font-semibold tracking-wide pb-5">Ingredients required</h1>
                    <div className="grid grid-cols-6">
                        <div className="col-span-1"></div>
                        <h1 className="text-grey-standard text-base col-span-3">Ingredient</h1>
                        <h1 className="text-grey-standard text-base col-span-1 mb-3">Quantity</h1>
                        <h1 className="text-grey-standard text-base col-span-1 mb-3">Units</h1>
                    </div>
                    <div className="">
                        <div className="overflow-y-auto h-64">
                            {
                                ingredientsBetween.map((ingredientsBetween) => {
                                    return (
                                        <IngredientBreakdownListing ingredient={ingredientsBetween.ingredient} quantity={ingredientsBetween.quantity} units={ingredientsBetween.units}/>
                                    )
                                })
                            }
                            {/* {Object.keys(ingredientsBetween).map((ingredient, quantity) => (
                                <IngredientBreakdownListing ingredient={ingredient} quantity={ingredientsBetween[ingredient]} />
                            ))} */}
                        </div>
                    </div>

                </div>

                <div className="bg-white-dirtyWhite rounded-xxl p-7">
                    <h1 className="text-green-standard text-xl font-semibold tracking-wide pb-5">Food required</h1>
                    <div className="grid grid-cols-6">
                        <div className="col-span-1"></div>
                        <h1 className="text-grey-standard text-base col-span-3">Food</h1>
                        <h1 className="text-grey-standard text-base col-span-2 mb-3">Quantity</h1>
                    </div>
                    <div>
                        <div className="overflow-y-auto h-64">
                            {Object.keys(foodBetween).map((ingredient, quantity) => (
                                <IngredientBreakdownListing ingredient={ingredient} quantity={"x " + foodBetween[ingredient]} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard