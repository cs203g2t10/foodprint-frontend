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
        <div className="grid grid-cols-12 mb-3 bg-white-standard p-2 rounded-large gap-x-3 items-center">
            <img className="mx-auto col-span-1 h-11 w-11 rounded-md ml-2 shadow-sm object-cover" src={props.imageUrl} alt="img" />
            <h1 className="col-span-3 px-4 text-sm text-grey-dark">{props.restaurantName}</h1>
            <h1 className="col-span-3 text-sm text-grey-dark">{props.dateTime}</h1>
            <div className="col-span-2 mx-auto text-sm text-grey-dark">
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
                    <NavLink className="text-white-standard text-center text-xs mx-auto col-span-2 w-20 px-1 grid my-auto py-1 bg-red-standard rounded-large shadow-md hover:shadow-lg opacity-90 hover:opacity-100"
                        to={"/payment/" + props.reservationId}>Payment</NavLink>
                    :
                    <NavLink className="text-white-standard text-center text-xs mx-auto col-span-2 w-20 px-1 grid my-auto py-1 bg-green-standard rounded-large shadow-md hover:shadow-lg opacity-90 hover:opacity-100"
                        to={"/payment/" + props.reservationId}>View Order</NavLink>
            }
            <div> {
                props.past || (props.status === "CANCELLED" && 'Cancelled') ? (<></>) : (<button className="my-auto col-span-1 mx-auto text-green-standard hover:bg-gray-200 bg-gray-100 shadow-sm hover:shadow-md p-2 rounded-full"
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
