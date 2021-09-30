import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import RestaurantService from '../services/RestaurantService'
import ReservationService from '../services/ReservationService'
import Modal from 'react-modal'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement('#root')

const Restaurant = () => {

    let id = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState([]);
    const [lineItems, setLineItems] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [modalIsOpen, setModal] = useState(false);
    const [pax, setPax] = useState(1);
    const [startDate, setStartDate] = useState();
    const [reserved, setReserved] = useState(false);

    useEffect(() => {
        RestaurantService.getRestaurant(id.id).then((response) => {
            setRestaurantDetails(response.data)
        })
    }, [id])

    const makeReservation = () => {
        startDate.setHours(startDate.getHours() + 8);
        ReservationService.makeReservation(startDate, pax, true, lineItems, id.id);
        startDate.setHours(startDate.getHours() - 8);
        setReserved(true);
    }

    const filterAcceptableTimings = (time) => {
        const currentDate = new Date()
        const selectedDate = new Date(time)
        // const opening = restaurantDetails.restaurantWeekdayOpeningHour * 3600000 + restaurantDetails.restaurantWeekdayOpeningMinutes * 60000;
        // const closing = restaurantDetails.restaurantWeekdayClosingHour * 3600000 + restaurantDetails.restaurantWeekdayClosingMinutes * 60000;
        // return currentDate.getTime() < selectedDate.getTime() && selectedDate.getTime() > opening && selectedDate.getTime() < closing;
        return currentDate.getTime() < selectedDate.getTime()
    };

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
                <div className="flex grid justify-center items-center gap-y-3">
                    <h1 className="flex flex-col text-7xl pt-12 pb-4">Reservation</h1>
                    <h1 className="flex flex-col text-lg text-center underline">Confirm your order below </h1>
                    <div>
                        {
                            lineItems?.map(
                                lineItem =>
                                    <div key={lineItem.food.foodId}>
                                        <div className="flex justify-center items-center gap-x-2">
                                            <p>{lineItem.quantity} x</p>
                                            <h1>{lineItem.food.foodName}</h1>
                                        </div>
                                    </div>
                            )
                        }
                    </div>
                    <div className="flex gap-x-4 justify-center">
                        <h1>Select Pax (5 max): </h1>
                        <input className="border flex focus:outline-none rounded px-3 w-1/6"
                            onChange={(e) => setPax(e.target.value)}
                            value={pax} required></input>
                    </div>
                    <div className="flex gap-x-4 items-center justify-center mx-auto">
                        <h1 className="text-right">Booking: </h1>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect
                            dateFormat="d/MM/yyyy, h:mm aa" className="flex flex-col focus:outline-none border text-center rounded py-0.5"
                            minDate={new Date()} filterTime={filterAcceptableTimings}
                        />
                    </div>

                    <div className="flex gap-x-4 items-center justify-center mx-auto">
                        <h1 className="text-right">Please declare that all guests are vaccinated: </h1>

                    </div>

                    <div className="flex gap-x-4 justify-center">
                        {/* {
                            (reserved ? <button className="border px-3 py-1 rounded">Proceed to payment</button> : <button className="border px-3 py-1 rounded" onClick={makeReservation}>Confirm</button>)
                        } */}
                        <button className="border px-3 py-1 rounded" onClick={makeReservation}>Confirm</button>
                        <button className="border px-3 py-1 rounded" onClick={() => setModal(false)}>Close</button>
                    </div>
                    {
                        (reserved ? <div className="pt-8">
                            <div className="text-center pb-2">Your reservation is successful! :)</div>
                            <button className="border px-3 py-1 rounded flex mx-auto">Proceed to payment</button>
                        </div>
                            : <></>)
                    }

                </div>
            </Modal>
        </div>
    )
}

export default Restaurant
