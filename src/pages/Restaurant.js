import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import RestaurantService from '../services/RestaurantService'
import ReservationModal from '../components/ReservationModal'

import "react-datepicker/dist/react-datepicker.css";

const Restaurant = () => {

    let id = useParams();

    const [restaurantDetails, setRestaurantDetails] = useState([]);
    const [lineItems, setLineItems] = useState([]);
    const [modalIsOpen, setModal] = useState(false);

    const [finalPrice, setFinalPrice] = useState(0);
    const [haveFood, setHaveFood] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const getModalProps = () => {
        return {id, modalIsOpen, lineItems, finalPrice, totalPrice, setModal};
    };

    useEffect(() => {
        RestaurantService.getRestaurant(id.id).then((response) => {
            setRestaurantDetails(response.data)
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
                            <img className="w-48 h-48 rounded-full"src="/images/shop.jpg" alt="shop" />
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
                    <use xlinkHref="#gentle-wave" x="100" y="2"  fill="rgba(243, 232, 201, 1)" />
                    </g>
                </svg>
            </div>
            
            <div className="flex items-center justify-items-center grid lg:grid-cols-5 gap-y-16 mx-24 mt-10 pb-8 animate__animated animate__fadeIn">
                {
                    restaurantDetails.allFood?.map(
                        food =>
                            <div className="bg-white-dirtyWhite h-auto w-48 shadow-md hover:shadow-lg rounded-xl flex-none p-5" key={food.foodId}>
                                    {/* <img src="/images/{food.picturePath}" className="mx-auto w-32 h-32 shadow-md rounded-full" alt="food pic" /> */}
                                    <img src="/images/sushi.jpg" className="mx-auto w-32 h-32 shadow-md rounded-full" alt="food pic" />
                                    <div className="flex-col mx-auto">
                                        <h1 className="flex justify-center">{food.foodName}</h1>
                                        <p className="text-grey-standard text-xl">{food.foodDesc}</p>
                                        <p className="flex justify-center text-3xl font-bold text-green-standard">${food.foodPrice}</p>

                                        <div className="flex justify-center py-2">
                                            <p> Qty: </p>
                                            <input onChange={e => {
                                                if (e.target.value === '0') {
                                                    setLineItems(oldArray => [...oldArray.filter(lineItem =>
                                                        lineItem.food.foodId !== food.foodId
                                                    )])
                                                } else {
                                                    setLineItems(oldArray => [...oldArray.filter(lineItem =>
                                                        lineItem.food.foodId !== food.foodId
                                                    ), {
                                                        food,
                                                        quantity: e.target.value
                                                    }])
                                                }
                                            }
                                            }
                                                className="focus:outline-none px-3 rounded mx-3" placeholder="0" type="number" min="0" max="20" />
                                        </div>
                                    </div>
                                <div className="flex">
                                </div>
                            </div>
                    )
                }
            </div>
            {(haveFood ? 
                <h1 className="text-center pb-2 text-red-600">Please select some food before continuing</h1>
                : 
                <div className="pt-9" />
            )}
            <button className="text-white-standard flex mx-auto py-3 px-5 bg-green-standard rounded-xl shadow-md hover:shadow-lg" onClick={makeReservationButtonClick}>Make Reservation</button>
            <ReservationModal {...getModalProps()} />
        </div>
    )
}



export default Restaurant
