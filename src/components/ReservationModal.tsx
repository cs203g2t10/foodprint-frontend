import { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
import Modal from 'react-modal'
import DatePicker from "react-datepicker";
import ReservationService from '../services/ReservationService'
import { Link } from 'react-router-dom';
import { useAppContext } from '../lib/AppContext';
import LogInService, { UserDetails } from '../services/LogInService';
import { BeatLoader } from 'react-spinners';
import { AiOutlineClose } from 'react-icons/ai';
import moment from 'moment';

Modal.setAppElement('#root')

const ReservationModal = (
    { id, modalIsOpen, lineItems, totalPrice, setModal, discount }:
        { id: any, modalIsOpen: boolean, lineItems: any[], totalPrice: number, setModal: SetStateAction<any>, discount: number }
) => {

    const { isAuthenticated } = useAppContext() || {}

    const [pax, setPax] = useState(1);
    const [bookingDate, setBookingDate] = useState<Date>();
    const [reserved, setReserved] = useState(false);
    const [isVaccinated, setVaccinated] = useState(false);
    const [vaxCheckBox, setVaxCheckBox] = useState(false);
    const [selectDate, setSelectDate] = useState(false);
    const [reservationId, setReservationId] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [afterDiscount, setAfterDiscount] = useState(0);
    const [availableSlots, setAvailableSlots] = useState<any[]>([]);

    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        if (userInfo.vaccinationName !== undefined) {
            setVaccinated(true);
        }
    }, [])

    useEffect(() => {
        setAfterDiscount(totalPrice - (totalPrice * discount / 100));
    }, [totalPrice, discount]);


    useEffect(() => {
        ReservationService.getSlots(id.id).then((resp) => {
            var newDateArray: Date[] = [];
            var dates = resp.data;
            for (let i = 0; i <= dates.length; i++) {
                let date = moment(dates[i]).toDate()
                newDateArray.push(date)
            }
            console.log(newDateArray);
            setAvailableSlots(newDateArray);
        });
    }, [modalIsOpen, id]);

    const makeReservation = () => {
        setError("");
        setLoading(true);
        if (bookingDate === undefined) {
            setSelectDate(true);
            setLoading(false);
            return;
        } else if (vaxCheckBox === false) {
            setError("Please declare the above")
            setLoading(false);
            return;
        }

        var d = new Date(bookingDate)
        d.setHours(d.getHours() + 8);

        const response = ReservationService.makeReservation(d, pax, true, lineItems, id.id)
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
    }

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    return <Modal isOpen={modalIsOpen} className="md:mt-20 mt-4 focus:outline-none" style={customStyles}>
        <div className="grid justify-center items-center gap-y-2 md:m-10 px-8 md:px-20 m-4 rounded-lg shadow lg:mx-64 pb-10 bg-white-dirtyWhite relative">
            <button className="absolute top-5 right-5 rounded-full hover:bg-grey-lightest shadow-sm p-2 bg-gray-200" onClick={() => setModal(false)}> <AiOutlineClose className="h-4 w-4" /> </button>
            <h1 className=" flex md:text-5xl text-3xl md:pt-12 pt-6 text-green-standard font-bold">Reservation</h1>
            <h1 className=" flex text-md mb-2 text-grey-standard font-light">Please confirm your order below </h1>
            <div className="grid lg:grid-cols-2 gap-x-16">
                <div>
                    <div className="overflow-y-auto md:max-h-72 max-h-32 md:mb-0 mb-2">
                        {
                            lineItems?.map(
                                (lineItem: any) => {
                                    let imageUrl = "/images/forkspoon.jpg"
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
                                            <p className="col-span-1 text-grey-light md:mr-4">{lineItem.quantity} x</p>
                                        </div>
                                    </div>

                                })
                        }
                    </div>
                    <div className="grid grid-cols-4 md:mb-0 mb-3">
                        <div className="col-span-2">
                            <div className="gap-x-2 text-md text-green-standard">Total:</div>
                            {
                                discount !== 0 && <>
                                    <div className="gap-x-2 text-md text-green-standard">Discount ({discount}% off):</div>
                                    <div className="gap-x-2 text-md text-green-standard">After discount:</div>
                                </>
                            }
                        </div>
                        <div>
                            <div className="gap-x-2 text-md text-grey-standard">${totalPrice.toFixed(2)}</div>
                            {
                                discount !== 0 && <>
                                    <div className="gap-x-2 text-md text-grey-standard">-${(totalPrice * discount / 100).toFixed(2)}</div>
                                    <div className="gap-x-2 text-md text-grey-standard">${afterDiscount.toFixed(2)}</div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex md:mb-5 mb-3">
                        <h1 className="text-md text-green-standard w-52">Pax (5 max): </h1>
                        <input className="flex focus:outline-none rounded-xl w-full pl-5 py-1 shadow-sm"
                            placeholder="0" type="number" min="1" max="5"
                            onChange={(e) => setPax(parseInt(e.target.value))}
                            value={pax} required disabled={reserved}></input>
                    </div>
                    {
                        (selectDate ? <h1 className="text-red-standard text-base">Please select a booking slot</h1> : <></>)
                    }
                    <div className="flex md:mb-5 mb-3">
                        <h1 className="flex text-md text-green-standard mr-5">Booking: </h1>
                        <DatePicker selected={bookingDate} onChange={(date: Date) => { setBookingDate(date); setSelectDate(false) }}
                            showTimeSelect
                            includeTimes={availableSlots}
                            includeDates={availableSlots}
                            dateFormat="d/MM/yyyy, h:mm aa"
                            className="flex flex-col focus:outline-none rounded-xl shadow-sm py-1 w-full pl-5"
                            disabled={reserved}
                        />
                    </div>

                    {
                        isVaccinated ? <>
                            <h1 className="flex text-base text-green-standard">Please declare the following: </h1>
                            <div className="flex">
                                <input
                                    name="isVaccinated"
                                    type="checkbox"
                                    id="checkbox"
                                    checked={vaxCheckBox}
                                    disabled={reserved}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setVaxCheckBox(e.target.type === 'checkbox' ? e.target.checked : (e.target.value === 'true'));
                                    }}
                                    className="my-auto mr-4 checkbox checkbox-md bg-white-standard " />
                                <label htmlFor="checkbox" className="text-sm text-grey-standard cursor-pointer">I hereby declare that all of the guests are vaccinated (compulsory)</label>
                            </div> </> : <>
                            <h1 className="flex text-base text-green-standard">Your vaccination status is not verified,</h1>
                            <h1 className="text-sm text-grey-standard mb-4">Please ensure you verify your vaccination status before proceeding with making a reservation</h1>
                            <div>
                                <Link to="/vaccinationcheck" className="bg-green-standard text-white-standard px-8 py-1 rounded-lg shadow hover:shadow-md">Verify Vaccination Status</Link>
                            </div>
                        </>
                    }
                    <div className="text-red-standard my-2">{error}</div>
                    <div className="grid grid-cols-2 gap-x-10 justify-center">
                        {
                            reserved ?
                                <div className="col-span-2">
                                    <div className="pb-1 text-green-standard text-center">Your reservation is successful!</div>
                                    <div className="flex justify-center">
                                        <Link to={"/payment/" + reservationId} className="bg-green-standard text-center py-1 rounded-lg shadow hover:shadow-md text-white-standard px-10">Make deposit to confirm</Link>
                                    </div>
                                </div>
                                :
                                isVaccinated && (
                                    isAuthenticated ? <>
                                        <button className="bg-green-standard text-white-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg border"
                                            onClick={makeReservation} disabled={reserved || loading}>
                                            <span>
                                                {
                                                    loading ?
                                                        <BeatLoader size="9" color="#daeddb" /> :
                                                        'Confirm'
                                                }
                                            </span>
                                        </button>
                                        <button className="text-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg border border-green-standard" onClick={() => setModal(false)}>Edit order</button>
                                    </> : <>
                                        <h1 className="text-sm text-grey-lighter col-span-2 pb-2 mt-3">Please <Link to="/login" className="text-green-standard">log in</Link> or <Link to="/register" className="text-green-standard">register</Link> to make a reservation:</h1>
                                        <div className="col-span-2 flex">
                                            <button className="text-green-standard px-7 py-1 rounded-lg shadow-md hover:shadow-lg border border-green-standard mt-2" onClick={() => setModal(false)}>Return</button>
                                        </div>
                                    </>)
                        }
                    </div>
                </div>
            </div>
        </div>
    </Modal>
}

export default ReservationModal;