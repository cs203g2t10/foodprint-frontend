import React, { useEffect, useState } from 'react'
import RestaurantService from '../services/RestaurantService'
import IngredientListing from '../components/IngredientListing';
import CreateIngredientModal from '../components/CreateIngredientModal';
import PageLinks from '../components/PageLinks';
import LogInService, { UserDetails } from '../services/LogInService';
import Restricted from '../components/errors/Restricted';

const ManageIngredients = () => {

    const [restaurantId, setRestaurantId] = useState(0);
    const [restaurantDetails, setRestaurantDetails] = useState<any>();
    const [restaurantIngredients, setRestaurantIngredients] = useState<any>();
    const [createIngredient, setCreateIngredient] = useState(false);

    const [numPages, setNumPages] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    const [deleteMessage, setDeleteMessage] = useState("");
    const [isAuthorized, setAuthorized] = useState(false);

    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        if (userInfo.userAuthorities.includes("FP_MANAGER")){
            setAuthorized(true);
        }
        setRestaurantId(userInfo.restaurantId);
        console.log("Restaurant ID %d", userInfo.restaurantId);
    }, [])

    useEffect(() => {
        if (restaurantId === 0) {
            return;
        }
        RestaurantService.getRestaurant(restaurantId).then((response) => {
            setRestaurantDetails(response.data);
        })
        RestaurantService.getAllIngredients(restaurantId, currPage).then((response) => {
            setRestaurantIngredients(response.data);
            setNumPages(response.data.totalPages)
        })
    }, [restaurantId, currPage, createIngredient, deleteMessage])
    
    if (!isAuthorized) {
        return (<Restricted/>)
    }

    return (
        <div className="min-h-screen">
            <h1 className="text-center font-bold tracking-wide text-4xl text-green-standard pt-5 bg-yellow-standard">Manage Ingredients for {restaurantDetails?.restaurantName}</h1>
            <div className="pt-1 text-center pb-7 text-grey-standard bg-yellow-standard mb-5">Please only edit those fields that you wish to change</div>
            <button className="mr-44 mb-3 border px-4 py-1 bg-green-standard opacity-90 hover:opacity-100 shadow-sm hover:shadow-md rounded-full ml-auto grid text-white-standard"
                onClick={() => { setCreateIngredient(true) }}>Create new Ingredient</button>
            <div className="mx-44 bg-white-offWhite pt-6 pb-8 rounded-xxl shadow">
                <div className="grid grid-cols-1 gap-y-9 items-center">
                    <div className="grid grid-cols-10 gap-x-6 mx-10">
                        <div className="col-span-1"></div>
                        {/* <p className="col-span-1 text-lg text-green-standard">ID</p> */}
                        <p className="col-span-3 text-lg text-green-standard">Ingredient Name</p>
                        <p className="col-span-3 text-lg text-green-standard">Description</p>
                        <p className="col-span-2 text-lg text-green-standard">Unit of Measure</p>
                        <div className="col-span-1"></div>
                    </div>
                    {
                        restaurantIngredients?.content.map(
                            (ingredient: any) => {
                                return (
                                    <IngredientListing 
                                        restaurantId={restaurantId}
                                        id={ingredient.ingredientId}
                                        name={ingredient.ingredientName}
                                        desc={ingredient.ingredientDesc}
                                        units={ingredient.units}
                                        key={ingredient.ingredientId} {...{setDeleteMessage}}/>
                                )
                            }
                        )
                    }
                </div>
            </div>
            <p className="mx-auto text-green-standard text-center pt-4">{deleteMessage}</p>
            <PageLinks {...{ numPages, currPage, setCurrPage}} />
            <div>
            </div>
            <CreateIngredientModal {...{ createIngredient, setCreateIngredient, restaurantId }} />
        </div>
    )
}

export default ManageIngredients
