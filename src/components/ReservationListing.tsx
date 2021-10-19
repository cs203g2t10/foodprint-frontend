import { AiOutlineClose } from 'react-icons/ai';

const ReservationListing = (props: any) => {

    return (
        <div className="grid grid-cols-9 mb-3 bg-white-standard p-2 rounded-large">
            <img className="flex items-center mx-auto col-span-1 h-10 w-10 rounded-full shadow-sm" src={props.imageUrl} alt="img"/>
            <h1 className="flex items-center col-span-2 text-sm text-grey-dark">{props.restaurantName}</h1>
            <h1 className="flex items-center mx-auto col-span-3 text-sm text-grey-dark">{props.dateTime}</h1>
            <button className="text-white-standard text-xs col-span-2 mx-auto my-auto py-1 px-4 bg-green-standard rounded-large shadow-md hover:shadow-lg" >View Details</button>
            <AiOutlineClose className="my-auto mx-auto"/>
            {/* <button className="px-2 rounded-lg bg-red-standard text-white-standard text-center" onClick={() => { deleteUser(props.id) }}>X</button> */}
        </div>
    )
}

export default ReservationListing
