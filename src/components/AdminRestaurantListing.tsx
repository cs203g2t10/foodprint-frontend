import { Link } from 'react-router-dom'

const AdminRestaurantListing = (props:any) => {
    const {restaurant} = props;

    return (
        <div className="grid grid-cols-8 gap-x-6 mx-6  rounded-large py-2 px-4">
            {
                restaurant.picture ? 
                <img className="col-span-1 h-12 w-12 rounded-lg shadow-sm object-cover" src={restaurant.picture?.url} alt={restaurant.restaurantName} />
                : <div className="col-span-1 border rounded-full h-10 w-10"/>
            }
            <p className="col-span-1 text-base text-grey-standard my-auto grid">{restaurant?.restaurantId}</p>
            <p className="col-span-2 text-base text-grey-standard my-auto grid">{restaurant?.restaurantName}</p>
            <Link to={'/managerestaurant/' + restaurant.restaurantId} className="my-auto grid col-span-2 text-base border border-green-standard text-green-standard text-center h-8 rounded-full opacity-90 shadow-sm hover:shadow-md hover:opacity-100">Manage Restaurant</Link>
            <Link to={'/manageingredients/' + restaurant.restaurantId} className="my-auto grid col-span-2 text-base border border-green-standard text-green-standard text-center h-8 rounded-full opacity-90 shadow-sm hover:shadow-md hover:opacity-100">Manage Ingredients</Link>
        </div>
    )
}

export default AdminRestaurantListing
