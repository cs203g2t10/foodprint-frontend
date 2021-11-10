import moment from 'moment';
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { AiFillSchedule } from 'react-icons/ai';
import ReservationService from '../services/ReservationService';
import Loading from './Loading';
import PageLinks from './PageLinks';
import RestaurantReservationList from './RestaurantReservationList';

const ReservationBreakdownSection = (props:any) => {

    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [numPages, setNumPages] = useState(0);
    const [currPage, setCurrPage] = useState(0);
    const [restaurantId, setRestaurantId] = useState(0);

    const [upcomingReservation, setUpcomingReservation] = useState([])
    const [reservationLoading, setReservationLoading] = useState(false);
    const [resError, setResError] = useState("")

    useEffect(() => {
        if (props.restaurantId === 0) {
            return;
        }
        setRestaurantId(props.restaurantId);
    }, [props])

    useEffect(() => {
        setStartDate(new Date());
        var newDate = new Date();
        newDate.setDate(newDate.getDate() + 7);
        setEndDate(newDate);
    }, [])

    useEffect(() => {
        if (restaurantId === 0) {
            return;
        }

        setReservationLoading(true);
        setUpcomingReservation([])
        setResError("");

        const start = moment(startDate).format("YYYY-MM-DD");
        const end = moment(endDate).format("YYYY-MM-DD");

        ReservationService.getRestaurantReservations(restaurantId, start, end, currPage).then((response) => {
            console.log('num pages:' + response.data.totalPages)
            setNumPages(response.data.totalPages)
            setUpcomingReservation(response.data.content)
            setReservationLoading(false);
        }).catch(err => {
            setResError(err.response.data.message);
            setReservationLoading(false);
        })
    }, [currPage, restaurantId, startDate, endDate])

    return (
        <div className="bg-white-dirtyWhite rounded-xxl p-7 mx-20">
            <div className="flex pb-5 px-14 gap-x-4">
                <AiFillSchedule className="text-green-standard text-3xl my-auto " />
                <h1 className="text-green-standard text-xl font-semibold tracking-wide">Upcoming reservation</h1>
                <div>
                    <ReactDatePicker className="focus:outline-none w-32 text-center py-1 rounded-full border"
                        selected={startDate} onChange={(date: any) => setStartDate(date)} selectsStart
                        dateFormat="dd/MM/yyyy" startDate={startDate} endDate={endDate} />
                </div>
                <div>
                    <ReactDatePicker className="focus:outline-none w-32 text-center py-1 rounded-full border"
                        selected={endDate} onChange={(date: any) => setEndDate(date)} selectsEnd
                        dateFormat="dd/MM/yyyy" startDate={startDate} endDate={endDate} />
                </div>
            </div>
            <div className="grid grid-cols-6 mx-10 px-14 mb-4">
                <h1 className="flex col-span-1 text-base text-grey-standard">Reservation Id</h1>
                <h1 className="flex col-span-1 text-base text-grey-standard">Booker</h1>
                <h1 className="flex col-span-2 text-base text-grey-standard">Reservation Date</h1>
                <h1 className="flex col-span-1 text-base text-grey-standard">Status</h1>
            </div>
            {
                reservationLoading && <div className="flex justify-center bg-white-standard rounded-xxl"><Loading /></div>
            }
            <div className="text-red-standard text-center">{resError}</div>
            {
                upcomingReservation?.map((upcomingReservation: any) => {
                    var dateTime = upcomingReservation.date;
                    return (
                        <RestaurantReservationList key={upcomingReservation.reservationId} reservationId={upcomingReservation.reservationId}
                            userFirstName={upcomingReservation.userFirstName} userLastName={upcomingReservation.userLastName}
                            date={moment(dateTime).format('MMM Do YYYY, h:mm a')} status={upcomingReservation.status} />
                    )
                })
            }
            <PageLinks {...{ numPages, currPage, setCurrPage }} />
        </div>
    )
}

export default ReservationBreakdownSection
