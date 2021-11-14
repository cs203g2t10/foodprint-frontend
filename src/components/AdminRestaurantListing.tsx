import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import DeleteRestaurantModal from './DeleteRestaurantModal';

const AdminRestaurantListing = (props: any) => {
    const { restaurant } = props;
    const [deleteRestaurantModal, setDeleteRestaurantModal] = useState(false);

    return (
        <div className="grid grid-cols-9 gap-x-6 mx-6  rounded-large py-2 px-4">
            {
                restaurant.picture ?
                    <img className="col-span-1 h-12 w-12 rounded-lg shadow object-cover" src={restaurant.picture?.url} alt={restaurant.restaurantName} />
                    : <div className="col-span-1 border rounded-lg h-12 w-12" />
            }
            <p className="col-span-1 text-base text-grey-standard my-auto">{restaurant?.restaurantId}</p>
            <p className="col-span-2 text-base text-grey-standard my-auto">{restaurant?.restaurantName}</p>
            <Link to={'/managerestaurant/' + restaurant.restaurantId} className="my-auto col-span-2 text-base border border-green-standard text-green-standard text-center h-8 rounded-lg opacity-90 shadow-sm hover:shadow-md hover:opacity-100">Manage Restaurant</Link>
            <Link to={'/manageingredients/' + restaurant.restaurantId} className="my-auto col-span-2 text-base border border-green-standard text-green-standard text-center h-8 rounded-lg opacity-90 shadow-sm hover:shadow-md hover:opacity-100">Manage Ingredients</Link>
            <button className="px-2 rounded-full w-8 h-8 bg-opacity-80 hover:bg-opacity-100 bg-red-standard text-white-standard text-center my-auto"
                onClick={() => setDeleteRestaurantModal(true)}>
                <AiOutlineClose />
            </button>
            <DeleteRestaurantModal restaurantId={restaurant.restaurantId} restaurantName={restaurant.restaurantName}
            {...{deleteRestaurantModal, setDeleteRestaurantModal}}/>
        </div>
    )
}

export default AdminRestaurantListing
