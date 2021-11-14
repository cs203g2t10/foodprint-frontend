import { useEffect, useState } from 'react'
import RestaurantService from '../services/RestaurantService'
import IngredientListing from '../components/IngredientListing';
import CreateIngredientModal from '../components/CreateIngredientModal';
import PageLinks from '../components/PageLinks';
import LogInService, { UserDetails } from '../services/LogInService';
import Restricted from '../components/errors/Restricted';
import { useParams } from 'react-router';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

const ManageIngredients = () => {

    let params = useParams<any>();

    const [restaurantId, setRestaurantId] = useState(0);
    const [restaurantDetails, setRestaurantDetails] = useState<any>();
    const [restaurantIngredients, setRestaurantIngredients] = useState<any>();
    const [createIngredient, setCreateIngredient] = useState(false);
    const [restaurantLink, setRestaurantLink] = useState("");

    const [numPages, setNumPages] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    const [isAuthorized, setAuthorized] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        if (userInfo.userAuthorities.includes("FP_MANAGER") && Object.keys(params).length === 0) {
            if (userInfo.restaurantId == null) {
                console.log("User has no restaurant ID");
                return;
            }
            setAuthorized(true);
            setRestaurantId(userInfo.restaurantId);
            setRestaurantLink("/managerestaurant");
        } else if (userInfo.userAuthorities.includes("FP_ADMIN")) {
            setRestaurantId(params.id);
            setAuthorized(true);
            setRestaurantLink("/managerestaurant/" + params.id);
        } else {
            return;
        }
        console.log("Restaurant ID %d", userInfo.restaurantId);
    }, [params])

    useEffect(() => {
        setRestaurantIngredients({});
        setLoading(true);
        if (restaurantId === 0) {
            return;
        }
        RestaurantService.getRestaurant(restaurantId).then((response) => {
            setRestaurantDetails(response.data);
        })
        RestaurantService.getAllIngredients(restaurantId, currPage).then((response) => {
            setRestaurantIngredients(response.data);
            setNumPages(response.data.totalPages)
            setLoading(false);
        })
    }, [restaurantId, currPage, createIngredient])

    if (!isAuthorized) {
        return (<Restricted />)
    }

    return (
        <div className="min-h-screen">
            <h1 className="text-center font-bold tracking-wide text-4xl text-green-standard pt-5 bg-yellow-standard">Manage Ingredients for {restaurantDetails?.restaurantName}</h1>
            <div className="pt-1 text-center pb-7 text-grey-standard bg-yellow-standard mb-5">Please only edit those fields that you wish to change</div>
            <div className="flex mx-44 justify-between mb-5">
                <Link className=" border px-8 py-1 bg-green-standard opacity-90 hover:opacity-100 shadow-sm hover:shadow-md rounded-lg text-white-standard"
                to={restaurantLink}>Manage Restaurant</Link>
                <button className=" border px-8 py-1 bg-green-standard opacity-90 hover:opacity-100 shadow-sm hover:shadow-md rounded-lg text-white-standard"
                    onClick={() => { setCreateIngredient(true) }}>Create new Ingredient</button>
            </div>

            <div className="md:mx-44 bg-white-offWhite pt-6 pb-8 rounded-lg shadow">
                <div className="grid grid-cols-1 gap-y-9 items-center">
                    <div className="grid grid-cols-10 gap-x-6 mx-10">
                        <div className="col-span-1"></div>
                        <p className="col-span-3 text-lg text-grey-dark">Ingredient Name</p>
                        <p className="col-span-3 text-lg text-grey-dark">Description</p>
                        <p className="col-span-2 text-lg text-grey-dark">Unit of Measure</p>
                        <div className="col-span-1"></div>
                    </div>
                    {
                        restaurantIngredients?.content?.map(
                            (ingredient: any) => {
                                return (
                                    <IngredientListing
                                        restaurantId={restaurantId}
                                        id={ingredient.ingredientId}
                                        name={ingredient.ingredientName}
                                        desc={ingredient.ingredientDesc}
                                        units={ingredient.units}
                                        key={ingredient.ingredientId} />
                                )
                            }
                        )
                    }
                </div>
            </div>
            {loading && <div className="flex justify-center py-1"><Loading /></div>}
            <PageLinks {...{ numPages, currPage, setCurrPage }} />
            <div>
            </div>
            <CreateIngredientModal {...{ createIngredient, setCreateIngredient, restaurantId }} />
        </div>
    )
}

export default ManageIngredients
