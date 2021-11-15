import { AiOutlineClose } from 'react-icons/ai';
import ReservationService from '../services/ReservationService';
import { NavLink } from 'react-router-dom'

const ReservationListing = (props: any) => {

    const { setDeleteMessage } = props;

    const cancelReservation: any = async (id: number) => {
        console.log(props.status)
        console.log(id)
        await ReservationService.cancelReservation(id);
        console.log(props.status)
    }

    return (
        <div className="grid md:grid-cols-12 grid-cols-11 mb-3 bg-white-standard p-2 rounded-large gap-x-3 items-center">
            <img className="mx-auto col-span-1 h-11 w-11 rounded-md ml-2 shadow-sm object-cover hidden md:block" src={props.imageUrl} alt="img" />
            <h1 className="col-span-3 md:px-4 text-sm text-grey-dark">{props.restaurantName}</h1>
            <h1 className="col-span-3 text-sm text-grey-dark">{props.dateTime}</h1>
            <div className="col-span-2 mx-auto md:text-sm text-2xs text-grey-dark">
                {
                    (props.status === "UNPAID" && 'Not Paid')
                }
                {
                    (props.status === "PAID" && 'Paid')
                }
                {
                    (props.status === "CANCELLED" && 'Cancelled')
                }
            </div>

            {
                props.status === "UNPAID" ?
                    <NavLink className="text-white-standard text-center md:text-xs text-2xs mx-auto col-span-2 md:w-20 w-14 px-1 my-auto py-1 bg-red-standard rounded-large shadow-md hover:shadow-lg opacity-90 hover:opacity-100"
                        to={"/payment/" + props.reservationId}>Payment</NavLink>
                    :
                    <NavLink className="text-white-standard text-center md:text-xs text-2xs mx-auto col-span-2 md:w-20 w-14 px-1 my-auto py-1 bg-green-standard rounded-large shadow-md hover:shadow-lg opacity-90 hover:opacity-100"
                        to={"/payment/" + props.reservationId}>View</NavLink>
            }
            <div> {
                props.past || (props.status === "CANCELLED" && 'Cancelled') ? (<></>) : (<button className="my-auto col-span-1 mx-auto md:text-base text-sm text-green-standard hover:bg-gray-200 bg-gray-100 shadow-sm hover:shadow-md md:p-2 p-1 rounded-full"
                    onClick={() => {
                        cancelReservation(props.reservationId);
                        setDeleteMessage("Your reservation at " + props.restaurantName + " has been cancelled")
                    }}><AiOutlineClose /></button>)
            }
            </div>
        </div>
    )
}

export default ReservationListing
