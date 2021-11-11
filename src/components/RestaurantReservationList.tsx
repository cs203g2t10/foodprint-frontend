import { useState } from "react"
import { Link } from "react-router-dom"
import LineItemsModal from "./LineItemsModal";

const RestaurantReservationList = (props: any) => {

    const [viewOrder, setViewOrder] = useState(false);

    return (
        <div className="grid grid-cols-6 mb-3 bg-white-standard p-4 rounded-large gap-x-3 mx-10 px-14">
            <h1 className="flex col-span-1 text-base text-green-standard">{props.reservationId}</h1>
            <h1 className="flex col-span-1 text-base text-grey-dark">{props.userFirstName} {props.userLastName}</h1>
            <h1 className="flex col-span-2 text-base text-grey-dark">{props.date}</h1>
            {
                props.status === 'PAID' && <h1 className="flex col-span-1 text-base text-green-standard">{props.status}</h1>
            }
            {
                props.status === 'CANCELLED' && <h1 className="flex col-span-1 text-base text-red-standard">{props.status}</h1>
            }
            {
                props.status === 'UNPAID' && <h1 className="flex col-span-1 text-base text-yellow-dark">{props.status}</h1>
            }
            <button className="text-base text-center grid col-span-1 bg-green-standard text-white-standard w-32 px-4 py-1 rounded-full shadow-md hover:shadow-lg"
            onClick={()=>setViewOrder(true)}>View orders</button>
            <LineItemsModal lineItems={props.lineItems} reservationId={props.reservationId}
            {...{viewOrder, setViewOrder}}/>
        </div>
    )
}

export default RestaurantReservationList