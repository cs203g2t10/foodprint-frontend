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
    const [modalIsOpen, setModal] = useState(false);
    const [pax, setPax] = useState(1);
    const [bookingDate, setBookingDate] = useState();
    const [reserved, setReserved] = useState(false);
    const [isVaccinated, setVaccinated] = useState(false);
    const [selectDate, setSelectDate] = useState(false);
    const [haveFood, setHaveFood] = useState(false);
    const [declare, setDeclare] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);

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

    const makeReservation = () => {
        if (bookingDate === undefined) {
            console.log('hi');
            setSelectDate(true);
            return;
        } else if (isVaccinated === false) {
            setDeclare(true);
            return;
        }
        bookingDate.setHours(bookingDate.getHours() + 8);
        ReservationService.makeReservation(bookingDate, pax, true, lineItems, id.id);
        bookingDate.setHours(bookingDate.getHours() - 8);
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
            {(haveFood ? <h1 className="text-center pb-2 text-red-600">Please select some food before continuing</h1> : <div className="pt-9" />)}
            <button className="text-white-standard flex mx-auto py-3 px-5 bg-green-standard rounded-xl shadow-md hover:shadow-lg" onClick={() => {
                if (lineItems.length === 0) {
                    setHaveFood(true);
                } else { setModal(true) }
            }}>Make Reservation</button>

                <Modal isOpen={modalIsOpen} className="mt-32" style={customStyles}>
                    <div className="flex grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-64 pb-10 bg-grey-lightest">
                        <h1 className=" flex text-5xl pt-12 mx-auto">Reservation</h1>
                        <h1 className=" flex mx-auto text-lg text-center">Please confirm your order below </h1>
                        <div>
                            {
                                lineItems?.map(
                                    lineItem =>
                                        <div key={lineItem.food.foodId}>
                                            <div className="flex justify-center items-center gap-x-2">
                                                <p>{lineItem.quantity} x</p>
                                                <h1>{lineItem.food.foodName}</h1>
                                                <h1>- ${lineItem.food.foodPrice * lineItem.quantity}</h1>
                                            </div>
                                        </div>

                                )
                            }
                            <div className="relative  flex justify-center items-center gap-x-2 text-lg">Total: ${totalPrice}</div>
                            <div className="relative flex justify-center items-center gap-x-2 text-lg mx-auto">
                                <div className="">GST: ${(totalPrice * 0.07).toFixed(2)}, </div>
                                <div className="">Service Charge: ${(totalPrice * 1.07 * 0.1).toFixed(2)}</div>
                            </div>
                            <div className="relative flex justify-center items-center gap-x-2 text-lg">Final price :${(finalPrice).toFixed(2)}</div>
                        </div>
                        <div className="flex gap-x-4 justify-center">
                            <h1>Select Pax (5 max): </h1>
                            <input className="border flex focus:outline-none rounded px-3 "
                                placeholder="0" type="number" min="1" max="5"
                                onChange={(e) => setPax(e.target.value)}
                                value={pax} required></input>
                        </div>
                        {
                            (selectDate ? <h1 className="flex mx-auto text-red-500">Please select a booking slot</h1> : <></>)
                        }
                        <div className="flex gap-x-4 items-center justify-center mx-auto">
                            <h1 className="text-right">Booking: </h1>
                            <DatePicker selected={bookingDate} onChange={(date) => { setBookingDate(date); setSelectDate(false) }} showTimeSelect
                                dateFormat="d/MM/yyyy, h:mm aa" className="flex flex-col focus:outline-none border text-center rounded py-0.5"
                                minDate={new Date()} filterTime={filterAcceptableTimings}
                            />
                        </div>
                        {
                            (declare ? <h1 className="text-center mx-auto flex text-red-600">You have not declared the following: </h1>
                                : <h1 className="text-center mx-auto flex">Please declare the following: </h1>)
                        }
                        {/* <h1 className="text-center mx-auto flex">Please declare the following: </h1> */}
                        <div className="flex gap-x-4 items-center justify-center mx-auto">
                            <div className="flex">
                                <input
                                    name="isVaccinated"
                                    type="checkbox"
                                    checked={isVaccinated}
                                    onChange={(e) => {
                                        setVaccinated(e.target.type === 'checkbox' ? e.target.checked : e.target.value);
                                        setDeclare(false);
                                    }} className="align-center my-auto mx-2" />
                                <h1>I hereby declare that all of the guests are vaccinated (compulsory)</h1>
                            </div>
                        </div>
                        <div className="flex gap-x-4 justify-center">
                            <button className="border px-3 py-1 rounded hover:shadow" onClick={makeReservation}>Confirm</button>
                            <button className="border px-3 py-1 rounded hover:shadow" onClick={() => setModal(false)}>Edit order</button>
                        </div>
                        {
                            (reserved ? <div>
                                <div className="text-center pb-2">Your reservation is successful! :)</div>
                                <button className="border px-3 py-1 rounded flex mx-auto hover:shadow">Proceed to payment</button>
                            </div>
                                : <></>)
                        }

                    </div>
                </Modal>
        </div>
    )
}

const customStyles = {
    overlay: {zIndex: 1000}
};

export default Restaurant
