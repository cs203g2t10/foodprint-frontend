import { useEffect, useState } from 'react'
import AdminRestaurantListing from '../components/AdminRestaurantListing'
import CreateRestaurantModal from '../components/CreateRestaurantModal'
import Restricted from '../components/errors/Restricted'
import Loading from '../components/Loading'
import { useAppContext } from '../lib/AppContext'
import LogInService, { UserDetails } from '../services/LogInService'
import RestaurantService from '../services/RestaurantService'
import PageLinks from '../components/PageLinks'

const AdminManageRestaurants = () => {

    const [restaurants, setRestaurants] = useState([])
    const [numPages, setNumPages] = useState(0);
    const [currPage, setCurrPage] = useState(0);

    const { isAuthenticated } = useAppContext() || {}
    const [isAuthorized, setAuthorized] = useState(false);

    const [createRestaurant, setCreateRestaurant] = useState(false);


    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        if (userInfo.userAuthorities.includes("FP_ADMIN")) {
            setAuthorized(true);
        }
    }, [])

    const getUserName = () => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        return `${userInfo.userFname}`;
    }

    useEffect(() => {
        setRestaurants([]);
        RestaurantService.getRestaurantsPaged(currPage).then((response) => {
            console.log(response)
            setNumPages(response.data.totalPages)
            setRestaurants(response.data.content)
        })
    }, [currPage])

    return (
        <div className="min-h-screen">
            {isAuthenticated && isAuthorized ? (
                <>
                    <div className="">
                        <h1 className="text-5xl font-bold pt-4 text-center text-green-standard bg-yellow-standard">Admin Restaurants Menu</h1>
                        <h1 className="text-lg text text-center text-grey-standard pb-8 bg-yellow-standard">Hello {getUserName()}, which restaurants / ingredients would you like to edit?</h1>

                        <button className="ml-auto mr-56 grid bg-green-standard opacity-95 hover:opacity-100 my-5 text-white-standard shadow-sm hover:shadow-md px-4 py-1 mx-14 rounded-lg"
                            onClick={() => { setCreateRestaurant(true) }}>Create New Restaurant</button>

                        <div className="mx-56 px-8 pb-5 grid grid-cols-8 gap-x-6">
                            <div className="col-span-1"></div>
                            <p className="col-span-1 text-base text-grey-standard">ID</p>
                            <p className="col-span-2 text-base text-grey-standard">Restaurant Name</p>
                            <p className="col-span-4 text-base text-grey-standard text-center">Manage options</p>
                        </div>

                        <div className="mx-56 px-8 overflow-auto bg-white-offWhite pt-6 pb-8 rounded-xxl shadow mb-2">

                            <div className="grid grid-cols-1 gap-y-3 items-center">
                                {
                                    restaurants?.map(
                                        (restaurant: any) => {
                                            console.log(restaurant);
                                            return (
                                                <AdminRestaurantListing key={restaurant.restaurantId} {...{ restaurant }} />
                                            )
                                        }
                                    )
                                }
                            </div>
                        </div>
                        <PageLinks {...{ numPages, currPage, setCurrPage}} />
                        <div className="flex justify-center">
                            {restaurants.length === 0 && <Loading />}
                        </div>
                    </div>
                    <CreateRestaurantModal {...{ createRestaurant, setCreateRestaurant }} />
                </>
            ) : (<Restricted />)}
        </div>
    )
}

export default AdminManageRestaurants
