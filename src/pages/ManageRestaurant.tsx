import React, { useEffect, useState } from 'react'
import CreateFoodModal from '../components/CreateFoodModal';
import Restricted from '../components/errors/Restricted';
import ManageFood from '../components/ManageFood';
import LogInService, { UserDetails } from '../services/LogInService';
import RestaurantService from '../services/RestaurantService';

const ManageRestaurant = () => {

    const [isAuthorized, setAuthorized] = useState(false);
    const [restaurantId, setRestaurantId] = useState<number>(0);
    const [restaurantDetails, setRestaurantDetails] = useState<any>([]);
    const [food, setFood] = useState([]);
    const [showCreateFood, setShowCreateFood] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [imageUrl, setImageUrl] = useState("/images/shop.jpg");

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
        if (restaurantId === 0) {
            return;
        }
        RestaurantService.getRestaurant(restaurantId).then((response) => {
            console.log(response.data);
            setRestaurantDetails(response.data)
            if (response.data.pictures.length > 0) {
                setImageUrl(response.data.pictures[0].url);
            }
        });
    }, [restaurantId, showCreateFood])

    useEffect(() => {
        if (restaurantId === 0) {
            return;
        }
        RestaurantService.managerGetAllIngredients(restaurantId).then((response) => {
            setIngredients(response.data);
        })
    }, [restaurantId])

    useEffect(() => {
        if (restaurantId === 0) {
            return;
        }
        RestaurantService.getAllFood(restaurantId).then((response) => {
            console.log(response.data);
            setFood(response.data);
        })
    }, [restaurantId])

    return (
        isAuthorized ?
            <div className="pt-8">
                <div className="flex items-center justify-center gap-x-10">
                    <img src={imageUrl} alt="shop" className="rounded-full w-48 h-48 " />
                    <div className="text-left pb-10">
                        <h1 className="text-5xl">{restaurantDetails.restaurantName}</h1>
                        <p>{restaurantDetails.restaurantDesc}</p>
                        <p>{restaurantDetails.restaurantLocation}</p>
                    </div>
                </div>


                <div className="mx-14 my-10 py-7 px-16 rounded-xxl bg-white-dirtyWhite shadow">
                    <div className="flex justify-between">
                        <h1 className="text-4xl text-green-standard font-bold pb-5">Menu</h1>
                        <button className="bg-green-standard text-1xl text-white-standard font-bold px-4 max-h-10 rounded-xxl shadow hover:shadow-md"
                        onClick={()=>{setShowCreateFood(true)}}>Add to Menu</button>
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                        {
                            food?.map((food: any) =>
                                <ManageFood key={food.foodId} name={food.foodName} desc={food.foodDesc} price={food.foodPrice}
                                    ingredientQty={food.foodIngredientQuantity} pic={food.pictures[0]}
                                    restaurantId={restaurantId} foodId={food.foodId}/>
                            )
                        }
                    </div>
                </div>
                <CreateFoodModal {...{ showCreateFood, setShowCreateFood, ingredients }} restaurantId={restaurantId}/>
            </div>
            : <Restricted />
    )
}

export default ManageRestaurant
