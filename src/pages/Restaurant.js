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

                <Modal isOpen={modalIsOpen} className="mt-20" style={customStyles}>
                    <div className="flex grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
                        <h1 className=" flex text-5xl pt-12 text-green-standard mx-20 font-bold">Reservation</h1>
                        <h1 className=" flex text-md mx-20 mb-2 text-grey-standard font-light">Please confirm your order below </h1>
                        <div className="grid lg:grid-cols-2 gap-x-16 mx-20">
                            <div>
                                <div className="overflow-y-auto max-h-72">
                                    {
                                        lineItems?.map(
                                            lineItem =>
                                                <div key={lineItem.food.foodId}>
                                                    <div className="grid grid-cols-7 flex bg-white-standard rounded-xl justify-center items-center gap-x-2 py-2 mb-3 ">
                                                        <div className="col-span-2 ml-5">
                                                            <img src="/images/sushi.jpg" className=" w-16 h-16 shadow-md rounded-full" alt="food pic" />
                                                        </div>
                                                        <div className="col-span-4 mx-5">
                                                            <h1 className="text-grey-dark text-xl">{lineItem.food.foodName}</h1>
                                                            <h1 className="text-grey-light text-sm">${lineItem.food.foodPrice * lineItem.quantity} each</h1>
                                                        </div>
                                                        <p className="col-span-1 text-grey-light mr-4">{lineItem.quantity} x</p>
                                                    </div>
                                                </div>

                                        )
                                    }
                                </div>
                                <div className="grid grid-cols-4">
                                    <div className="col-span-2">
                                        <div className="gap-x-2 text-md text-green-standard">Total:</div>
                                        <div className="gap-x-2 text-md text-green-standard">GST:</div>
                                        <div className="gap-x-2 text-md text-green-standard">Service Charge:</div>
                                        <div className="gap-x-2 text-md text-green-standard">Final price :</div>
                                    </div>
                                    <div>
                                        <div className="gap-x-2 text-md text-grey-standard">${totalPrice}</div>
                                        <div className="gap-x-2 text-md text-grey-standard">${(totalPrice * 0.07).toFixed(2)}</div>
                                        <div className="gap-x-2 text-md text-grey-standard">${(totalPrice * 1.07 * 0.1).toFixed(2)}</div>
                                        <div className="gap-x-2 text-md text-grey-standard">${(finalPrice).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex mb-5">
                                    <h1 className="text-md text-green-standard mr-5">Pax (5 max): </h1>
                                    <input className="flex focus:outline-none rounded-xl w-56 pl-5 py-1 shadow-sm"
                                        placeholder="0" type="number" min="1" max="5"
                                        onChange={(e) => setPax(e.target.value)}
                                        value={pax} required></input>
                                </div>
                                {
                                    (selectDate ? <h1 className="text-red-standard text-base">Please select a booking slot</h1> : <></>)
                                }
                                <div className="flex mb-8">
                                    <h1 className="flex text-md text-green-standard mr-5">Booking: </h1>
                                    <DatePicker selected={bookingDate} onChange={(date) => { setBookingDate(date); setSelectDate(false) }} showTimeSelect
                                        dateFormat="d/MM/yyyy, h:mm aa" className="flex flex-col focus:outline-none rounded-xl shadow-sm py-1 w-64 pl-5"
                                        minDate={new Date()} filterTime={filterAcceptableTimings}
                                    />
                                </div>
                                {
                                    (declare ? <h1 className="text-center flex text-red-standard text-base">You have not declared the following: </h1>
                                        : <h1 className="flex text-base text-green-standard">Please declare the following: </h1>)
                                }
                                {/* <h1 className="text-center mx-auto flex">Please declare the following: </h1> */}
                                <div className="flex mb-5">
                                    <div className="flex">
                                        <input
                                            name="isVaccinated"
                                            type="checkbox"
                                            checked={isVaccinated}
                                            onChange={(e) => {
                                                setVaccinated(e.target.type === 'checkbox' ? e.target.checked : e.target.value);
                                                setDeclare(false);
                                            }} className="my-auto mr-4" />
                                        <h1 className="text-sm text-grey-standard">I hereby declare that all of the guests are vaccinated (compulsory)</h1>
                                    </div>
                                </div>
                                <div className="flex grid grid-cols-2 gap-x-10 mr-2 justify-center">
                                    <button className="text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg" onClick={makeReservation}>Confirm</button>
                                    <button className="bg-green-standard text-white-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg" onClick={() => setModal(false)}>Edit order</button>
                                </div>
                                {
                                    (reserved ? <div>
                                        <div className="pt-5 pb-3 text-green-standard">Your reservation is successful!</div>
                                        <button className="bg-green-standard text-white-standard px-7 py-1 rounded-xl flex shadow-md hover:shadow-lg">Proceed to payment</button>
                                    </div>
                                        : <></>)
                                }
                            </div>
                        </div>


                    </div>
                </Modal>
        </div>
    )
}

const customStyles = {
    overlay: {zIndex: 1000}
};

export default Restaurant
