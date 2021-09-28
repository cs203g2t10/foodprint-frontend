import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import RestaurantService from '../services/RestaurantService'
import ReservationService from '../services/ReservationService'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const Restaurant = () => {

    let id = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState([]);
    const [lineItems, setLineItems] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [modalIsOpen, setModal] = useState(false);

    useEffect(() => {
        RestaurantService.getRestaurant(id.id).then((response) => {
            // console.log(response.data)
            setRestaurantDetails(response.data)
        })
    }, [id])

    const makeReservation = () => {
        ReservationService.makeReservation("2021-12-25T17:21:29.142Z", 4, true, lineItems, id.id);
    }

    return (
        <div>
            <h1 className="text-center text-7xl pt-12 pb-4">{restaurantDetails.restaurantName}</h1>
            <p className="text-center text-2xl ">{restaurantDetails.restaurantDesc}</p>
            <p className="text-center text-1xl pb-4 ">{restaurantDetails.restaurantLocation}</p>
            <div className="flex grid lg:grid-cols-3 mx-14 gap-y-12 gap-x-5 ">
                {
                    restaurantDetails.allFood?.map(
                        food =>
                            <div className="border rounded shadow-md py-3" key={food.foodId}>
                                <div className="flex gap-2 p-6 rounded-md">
                                    <img src="/images/{food.picturePath}" className="h-full w-32 border flex-col mx-auto" alt="food pic" />
                                    <div className="flex-col mx-auto">
                                        <h1>{food.foodName}</h1>
                                        <p className="text-grey-standard">{food.foodDesc}</p>
                                        <p className="text-grey-standard">$ {food.foodPrice}</p>

                                        <div className="flex py-2">
                                            <p>Qty:</p>
                                            <input onChange={e => {
                                                setQuantity(e.target.value)
                                            }
                                            }
                                                className="focus:outline-none px-3 rounded" placeholder="0" type="number" min="0" max="20" />
                                        </div>

                                        <button onClick={() => {
                                            if (quantity === 0) {
                                                return;
                                            }
                                            setLineItems(oldArray => [...oldArray.filter(lineItem =>
                                                lineItem.food.foodId !== food.foodId
                                            ), {
                                                food,
                                                quantity
                                            }])
                                            setQuantity(0)
                                        }}
                                            className="flex flex-col border px-4 py-2 my-4 rounded-lg hover:shadow text-center mx-auto">
                                            Add to order
                                        </button>
                                    </div>
                                </div>
                                <div className="flex">
                                </div>
                            </div>
                    )
                }
            </div>
            <button className="flex mx-auto py-2 px-4 border my-10 rounded shadow-md" onClick={() => setModal(true)}>Make Reservation</button>
            <Modal isOpen={modalIsOpen} >
                <div className="flex grid justify-center items-center">
                    <h1 className="flex flex-col text-7xl pt-12 pb-4">Make Reservation</h1>
                    <div>
                        {
                            lineItems?.map(
                                lineItem =>
                                    <div key={lineItem.food.foodId}>
                                        <div className="flex justify-center items-center">
                                            <p>{lineItem.quantity} x </p>
                                            <h1> {lineItem.food.foodName}</h1>

                                        </div>
                                    </div>
                            )
                        }
                    </div>
                    <div className="flex gap-x-4 justify-center">
                        <button className="border p-3 rounded" onClick={makeReservation}>Confirm</button>
                        <button className="border p-3 rounded" onClick={() => setModal(false)}>Close</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Restaurant
