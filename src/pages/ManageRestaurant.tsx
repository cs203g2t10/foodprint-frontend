import React, { useEffect, useState } from 'react'
import CreateFoodModal from '../components/CreateFoodModal';
import EditRestaurantDetails from '../components/EditRestaurantDetails';
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
    const [editDetails, setEditDetails] = useState(false);

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
            if (response.data.picture) {
                setImageUrl(response.data.picture.url);
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
            <div className="min-h-screen">
                <div>
                    <div className="absolute z-10">
                        <div className="grid grid-cols-9 gap-x-16 mx-4 my-10">
                            <h2 className="col-span-1">&nbsp;</h2>
                            <div className="col-span-2">
                                <img className="w-40 h-40 rounded-full" src={imageUrl} alt="shop" />
                            </div>
                            <div className="col-span-6 px-0">
                                <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-green-standard">{restaurantDetails.restaurantName}</h1>
                                <p className="text-lg md:text-2xl text-green-standard">{restaurantDetails.restaurantDesc}</p>
                                <p className="text-md md:pb-4 text-grey-standard">{restaurantDetails.restaurantLocation}</p>
                                <button className="bg-green-standard text-white-standard px-4 py-1 rounded-full"
                                onClick={()=>{setEditDetails(true)}}>Edit Details</button>
                            </div>
                        </div>
                        
                    </div>
                    <svg className="waves h-80 w-full transform -rotate-180 " xmlns="http://www.w3.org/2000/svg" viewBox="100 20 130 70" preserveAspectRatio="none" shape-rendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave" x="100" y="2" fill="rgba(243, 232, 201, 1)" />
                        </g>
                    </svg>
                </div>


                <div className="mx-10 px-16">

                    <div className="flex justify-between">
                        <h1 className="text-5xl text-grey-standard font-bold pb-3">Menu</h1>
                        <button className="bg-green-standard text-1xl text-white-standard opacity-90 hover:opacity-199 px-4 max-h-10 rounded-full shadow-md hover:shadow-lg"
                        onClick={()=>{setShowCreateFood(true)}}>Add to Menu</button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {
                            food?.map((food: any) =>
                                <ManageFood className="bg-white-offWhite" key={food.foodId} name={food.foodName} desc={food.foodDesc} price={food.foodPrice}
                                    ingredientQty={food.foodIngredientQuantity} pic={food.picture}
                                    restaurantId={restaurantId} foodId={food.foodId} />
                            )
                        }
                    </div>
                </div>
                <CreateFoodModal {...{ showCreateFood, setShowCreateFood, ingredients }} restaurantId={restaurantId} />
                <EditRestaurantDetails {...{editDetails, setEditDetails, restaurantDetails}}/>
            </div>
            : <Restricted />
    )
}

export default ManageRestaurant
