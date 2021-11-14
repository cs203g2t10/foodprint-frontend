import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { PuffLoader } from 'react-spinners';
import UserService from '../services/UserService';

const FavouriteRestaurant = (props: any) => {

    const [favLoading, setFavLoading] = useState(false);
    const [isFavourite, setIsFavourite] = useState(true);

    const deleteFavourite: any = async (id: number) => {
        setFavLoading(true);
        UserService.deleteFavRestaurant(id).then((response) => {
            setFavLoading(false);
            console.log(response);
            setIsFavourite(false);
        }).catch((error) => {
            setFavLoading(false);
            console.log(error.response);
        })
    }

    const addRestaurantToFav: any = (id: number) => {
        setFavLoading(true);
        UserService.addRestaurantToFav(id).then((response) => {
            console.log(response);
            setIsFavourite(true);
            setFavLoading(false);
        }).catch((error) => {
            console.log(error.response);
            setFavLoading(false);
        })
    }

    return (
        <div className="bg-white-offWhite mb-3 grid grid-cols-5 py-2 px-4 rounded-large">
            <img className="shadow-sm h-12 w-12 object-fill rounded-lg col-span-1 ml-2" src={props.url} alt="pic" />
            <h1 className="text-base col-span-3 my-auto grid pl-5">{props.name}</h1>
            {
                favLoading ?
                    <div className="pt-2">
                        <PuffLoader size="30" color="green" />
                    </div> :
                    (isFavourite ?
                        <AiFillHeart className="text-2xl my-auto text-red-standard opacity-100 hover:opacity-90 ml-1"
                            onClick={() => {
                                deleteFavourite(props.restaurantId);
                            }} />
                        : <AiFillHeart className="text-2xl my-auto text-grey-standard opacity-60 hover:text-red-standard hover:opacity-90 ml-1"
                            onClick={() => {
                                addRestaurantToFav(props.restaurantId);
                            }}
                        />)
            }
            {/* <AiFillHeart className="text-xl my-auto grid text-red-standard opacity-90 hover:opacity-100" onClick={() => { deleteFavourite(props.restaurantId); }} /> */}
        </div>
    )
}

export default FavouriteRestaurant