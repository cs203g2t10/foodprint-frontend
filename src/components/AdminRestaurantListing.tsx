import { Link } from 'react-router-dom'

const AdminRestaurantListing = (props:any) => {
    const {restaurant} = props;

    return (
        <div className="grid grid-cols-11 gap-x-6 mx-6 ">
            {
                restaurant.picture ? 
                <img className="col-span-1 h-10 w-10 rounded-full object-cover" src={restaurant.picture?.url} alt={restaurant.restaurantName} />
                : <div className="col-span-1 border rounded-full h-10 w-10"/>
            }
            <p className="col-span-1 text-lg text-grey-dark">{restaurant?.restaurantId}</p>
            <p className="col-span-3 text-lg text-grey-dark">{restaurant?.restaurantName}</p>
            <Link to={'/managerestaurant/' + restaurant.restaurantId} className="col-span-3 text-lg border border-green-standard text-green-standard text-center h-8 rounded-full">Manage Restaurant</Link>
            <Link to={'/manageingredient/' + restaurant.restaurantId} className="col-span-3 text-lg border border-green-standard text-green-standard text-center h-8 rounded-full">Manage Ingredients</Link>
        </div>
    )
}

export default AdminRestaurantListing
