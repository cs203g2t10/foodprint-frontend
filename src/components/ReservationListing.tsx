import { AiOutlineClose } from 'react-icons/ai';
import ReservationService from '../services/ReservationService';
import { Link } from 'react-router-dom'

const ReservationListing = (props: any) => {

    const { setDeleteMessage } = props;

    const deleteReservation: any = async (id: number) => {
        console.log(id)
        await ReservationService.deleteReservation(id);
    }

    return (
        <div className="grid grid-cols-12 mb-3 bg-white-standard p-2 rounded-large gap-x-3">
            <img className="flex items-center mx-auto col-span-1 h-11 w-11 rounded-md ml-2 shadow-sm" src={props.imageUrl} alt="img" />
            <h1 className="flex items-center col-span-3 px-4 text-sm text-grey-dark">{props.restaurantName}</h1>
            <h1 className="flex items-center col-span-3 text-sm text-grey-dark">{props.dateTime}</h1>
            <div className="flex items-center col-span-2 mx-auto text-sm text-grey-dark">
                {
                    (props.status === "UNPAID" &&
                        <Link to={"/payment/" + props.reservationId}>
                            <div>
                                <button className="bg-red-standard opacity-90 hover:opacity-100 text-white-standard text-xs mx-auto col-span-2 w-20 px-1 my-auto py-1 rounded-large shadow-md hover:shadow-lg">Not paid</button>
                            </div>
                        </Link>)
                }
                {
                    (props.status === "PAID" && 'Paid')
                }
                {
                    (props.status==="CANCELLED" && 'Cancelled')
                }
            </div>

            <button className="text-white-standard text-xs mx-auto col-span-2 w-20 px-1 grid my-auto py-1 bg-green-standard rounded-large shadow-md hover:shadow-lg opacity-90 hover:opacity-100">View Order</button>
            <div> {
                props.past ? (<></>) : (<button className="my-auto col-span-1 mx-auto text-green-standard hover:bg-gray-200 bg-gray-100 shadow-sm hover:shadow-md p-2 rounded-full" onClick={() => { deleteReservation(props.reservationId); setDeleteMessage("Your reservation at " + props.restaurantName + " has been cancelled") }}><AiOutlineClose /></button>)
            }
            </div>
        </div>
    )
}

export default ReservationListing
