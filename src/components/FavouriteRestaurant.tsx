import React from 'react'
import { AiFillHeart } from 'react-icons/ai';

const FavouriteRestaurant = (props: any) => {
    return (
        <div className="bg-white-offWhite mb-3 grid grid-cols-5 py-2 px-4 rounded-large">
            <img className="shadow-sm h-12 w-12 object-fill rounded-lg col-span-1 ml-2" src={props.url} alt="restaurant" />
            <h1 className="text-base col-span-3 my-auto grid pl-5">{props.name}</h1>
            <AiFillHeart className="text-xl my-auto grid text-red-standard opacity-90 hover:opacity-100" />
        </div>
    )
}

export default FavouriteRestaurant