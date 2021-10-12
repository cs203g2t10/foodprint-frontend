import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import RestaurantService from '../services/RestaurantService'
import ReservationModal from '../components/ReservationModal'

import "react-datepicker/dist/react-datepicker.css";
import RestaurantFood from '../components/RestaurantFood';

const Restaurant = () => {

    let id = useParams();

    const [restaurantDetails, setRestaurantDetails] = useState([]);
    const [food, setFood] = useState([]);
    const [lineItems, setLineItems] = useState([]);
    const [modalIsOpen, setModal] = useState(false);

    const [finalPrice, setFinalPrice] = useState(0);
    const [haveFood, setHaveFood] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    let imageUrl = "/images/shop.jpg";

    useEffect(() => {
        RestaurantService.getRestaurant(id.id).then((response) => {
            console.log(response.data.pictures.length)
            setRestaurantDetails(response.data)
        })
    }, [id])

    useRef(() => {
        if (restaurantDetails.pictures.length > 0) {
            imageUrl = restaurantDetails.pictures[0].url;
        }
    }, [id])

    useEffect(() => {
        RestaurantService.getAllFood(id.id).then((response) => {
            setFood(response.data)
        })
    }, [id])

    useEffect(() => {
        setTotalPrice(0);
        lineItems.map((lineItem) => {
            return setTotalPrice((old) => old + lineItem.food.foodPrice * lineItem.quantity)
        })
    }, [lineItems])

    useEffect(() => {
        setFinalPrice(totalPrice * 1.17)
    }, [totalPrice])

    const makeReservationButtonClick = () => {
        if (lineItems.length === 0) {
            setHaveFood(true);
        } else {
            setModal(true)
        }
    }

    return (
        <div>
            <div className>
                <div className="absolute z-10">
                    <div className="grid grid-cols-7 gap-x-16 mx-32 my-10">
                        <div className="col-span-2">
                            <img className="w-48 h-48 rounded-full" src={imageUrl} alt="shop" />
                        </div>
                        <div className="col-span-5">
                            <h1 className="text-7xl  pb-4">{restaurantDetails.restaurantName}</h1>
                            <p className="text-2xl ">{restaurantDetails.restaurantDesc}</p>
                            <p className="text-1xl pb-4 ">{restaurantDetails.restaurantLocation}</p>
                        </div>
                    </div>
                </div>
                <svg className="h-72 waves w-screen transform -rotate-180 " xmlns="http://www.w3.org/2000/svg" viewBox="100 20 130 70" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="100" y="2" fill="rgba(243, 232, 201, 1)" />
                    </g>
                </svg>
            </div>

            <div className="grid items-center justify-items-center lg:grid-cols-5 gap-y-16 mx-24 mt-10 pb-8 animate__animated animate__fadeIn">
                {
                    food?.map(
                        food => <RestaurantFood {...{ food, setLineItems }} key={food.foodId} />
                    )
                }
            </div>
            {(haveFood ?
                <h1 className="text-center pb-2 text-red-600">Please select some food before continuing</h1>
                :
                <div className="pt-9" />
            )}
            <button className="text-white-standard flex mx-auto py-3 px-5 bg-green-standard rounded-xl shadow-md hover:shadow-lg" onClick={makeReservationButtonClick}>Make Reservation</button>
            <ReservationModal {...{ id, modalIsOpen, lineItems, finalPrice, totalPrice, setModal }} />
        </div>
    )
}



export default Restaurant
