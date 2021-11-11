import { AiFillHeart } from 'react-icons/ai';
import UserService from '../services/UserService';

const FavouriteRestaurant = (props: any) => {

    const { setDeleteMessage } = props;

    const deleteFavourite: any = async (id: number) => {
        UserService.deleteFavRestaurant(id).then((response) => {
            console.log(response);
            setDeleteMessage("restaurant " + props.name + " has been unfavourited");
        }).catch((error) => {
            console.log(error.response);
        })
    }

    return (
        <div className="bg-white-offWhite mb-3 grid grid-cols-5 py-2 px-4 rounded-large">
            <img className="shadow-sm h-12 w-12 object-fill rounded-lg col-span-1 ml-2" src={props.url} alt="pic" />
            <h1 className="text-base col-span-3 my-auto grid pl-5">{props.name}</h1>
            <AiFillHeart className="text-xl my-auto grid text-red-standard opacity-90 hover:opacity-100" onClick={() => { deleteFavourite(props.restaurantId); }} />
        </div>
    )
}

export default FavouriteRestaurant