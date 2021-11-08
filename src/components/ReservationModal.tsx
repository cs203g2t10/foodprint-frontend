import { ChangeEvent, SetStateAction, useState } from 'react'
import Modal from 'react-modal'
import DatePicker from "react-datepicker";
import ReservationService from '../services/ReservationService'
import { Link } from 'react-router-dom';

Modal.setAppElement('#root')

const ReservationModal = (
    { id, modalIsOpen, lineItems, finalPrice, totalPrice, setModal }:
        { id: any, modalIsOpen: boolean, lineItems: any[], finalPrice: number, totalPrice: number, setModal: SetStateAction<any> }
) => {

    const [pax, setPax] = useState(1);
    const [bookingDate, setBookingDate] = useState<Date>();
    const [reserved, setReserved] = useState(false);
    const [isVaccinated, setVaccinated] = useState(false);
    const [selectDate, setSelectDate] = useState(false);
    const [declare, setDeclare] = useState(false);
    const [reservationId, setReservationId] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    // const [noSlot, setNoSlot] = useState(false);

    const filterAcceptableTimings = (time: any) => {
        const currentDate = new Date()
        const selectedDate = new Date(time)
        // const opening = restaurantDetails.restaurantWeekdayOpeningHour * 3600000 + restaurantDetails.restaurantWeekdayOpeningMinutes * 60000;
        // const closing = restaurantDetails.restaurantWeekdayClosingHour * 3600000 + restaurantDetails.restaurantWeekdayClosingMinutes * 60000;
        // return currentDate.getTime() < selectedDate.getTime() && selectedDate.getTime() > opening && selectedDate.getTime() < closing;
        return currentDate.getTime() < selectedDate.getTime()
    };

    const makeReservation = () => {
        setLoading(true);
        if (bookingDate === undefined) {
            setSelectDate(true);
            setLoading(false);
            return;
        } else if (isVaccinated === false) {
            setDeclare(true);
            setLoading(false);
            return;
        }
        bookingDate.setHours(bookingDate.getHours() + 8);

        const response = ReservationService.makeReservation(bookingDate, pax, true, lineItems, id.id)
        response.then((resp) => {
            console.log(resp);
            if (resp.status === 201) {
                console.log("Reservation successful, id: ", resp.data.reservationId)
                setReservationId(resp.data.reservationId);
                setReserved(true);
                setLoading(false);
            } else {
                console.log("Error ", resp.data);
                setError("Error: " + resp.data.message);
                setLoading(false);
            }
        })
        bookingDate.setHours(bookingDate.getHours() - 8);
    }

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    return <Modal /* lineItems={lineItems} */ isOpen={modalIsOpen} className="mt-20 focus:outline-none" style={customStyles}>
        <div className="grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
            <h1 className=" flex text-5xl pt-12 text-green-standard mx-20 font-bold">Reservation</h1>
            <h1 className=" flex text-md mx-20 mb-2 text-grey-standard font-light">Please confirm your order below </h1>
            <div className="grid lg:grid-cols-2 gap-x-16 mx-20">
                <div>
                    <div className="overflow-y-auto max-h-72">
                        {
                            lineItems?.map(
                                (lineItem: any) => {
                                    let imageUrl = "/images/sushi.jpg"
                                    if (lineItem.food.picture) {
                                        imageUrl = lineItem.food.picture.url
                                    }
                                    return <div key={lineItem.food.foodId}>
                                        <div className="grid grid-cols-7 bg-white-standard rounded-xl justify-center items-center gap-x-2 py-2 mb-3 ">
                                            <div className="col-span-2 ml-5">
                                                <img src={imageUrl} className=" w-16 h-16 shadow-md rounded-full object-cover" alt="food pic" />
                                            </div>
                                            <div className="col-span-4 mx-5">
                                                <h1 className="text-grey-dark text-xl">{lineItem.food.foodName}</h1>
                                                <h1 className="text-grey-light text-sm">${lineItem.food.foodPrice} each</h1>
                                            </div>
                                            <p className="col-span-1 text-grey-light mr-4">{lineItem.quantity} x</p>
                                        </div>
                                    </div>

                                })
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
                            onChange={(e) => setPax(parseInt(e.target.value))}
                            value={pax} required></input>
                    </div>
                    {
                        (selectDate ? <h1 className="text-red-standard text-base">Please select a booking slot</h1> : <></>)
                    }
                    <div className="flex mb-8">
                        <h1 className="flex text-md text-green-standard mr-5">Booking: </h1>
                        <DatePicker selected={bookingDate} onChange={(date: Date) => { setBookingDate(date); setSelectDate(false) }} showTimeSelect
                            dateFormat="d/MM/yyyy, h:mm aa" className="flex flex-col focus:outline-none rounded-xl shadow-sm py-1 w-64 pl-5"
                            minDate={new Date()} filterTime={filterAcceptableTimings}
                        />
                    </div>
                    {
                        (declare ? <h1 className="text-center flex text-red-standard text-base">You have not declared the following: </h1>
                            : <h1 className="flex text-base text-green-standard">Please declare the following: </h1>)
                    }
                    {/* <h1 className="text-center mx-auto flex">Please declare the following: </h1> */}
                    <div className="flex">
                        <div className="flex">
                            <input
                                name="isVaccinated"
                                type="checkbox"
                                checked={isVaccinated}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setVaccinated(e.target.type === 'checkbox' ? e.target.checked : (e.target.value === 'true'));
                                    setDeclare(false);
                                }} className="my-auto mr-4" />
                            <h1 className="text-sm text-grey-standard">I hereby declare that all of the guests are vaccinated (compulsory)</h1>
                        </div>
                    </div>
                    <div className="text-red-standard py-4">{error}</div>
                    <div className="grid grid-cols-2 gap-x-10 mr-2 justify-center">
                        <button className=" bg-green-standard text-white-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg border"
                            onClick={makeReservation} disabled={reserved || loading}>
                            <span>
                                {
                                    loading ?
                                        <div className="spinner" id="spinner"></div> :
                                        'Confirm'
                                }
                            </span>
                        </button>
                        <button className="text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg border border-green-standard" onClick={() => setModal(false)}>Edit order</button>

                    </div>
                    {
                        (reserved ?
                            <div className="grid">
                                <div className="pt-5 pb-3 text-green-standard text-center">Your reservation is successful!</div>
                                <Link to={"/payment/" + reservationId} className="border bg-green-standard text-center mx-auto py-1.5 rounded-xl shadow-md hover:shadow-lg text-white-standard px-10">Proceed to payment</Link>
                            </div>
                            : <></>)
                    }

                </div>
            </div>
        </div>
    </Modal>
}

export default ReservationModal;