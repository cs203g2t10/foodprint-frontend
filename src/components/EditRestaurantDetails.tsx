import { useEffect, useState } from 'react'
import ReactModal from 'react-modal';
import { BeatLoader } from 'react-spinners';
import RestaurantService from '../services/RestaurantService';
import { AiOutlineClose } from 'react-icons/ai';

const EditRestaurantDetails = (props: any) => {

    const { editDetails, setEditDetails, restaurantDetails } = props;

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [tableCapacity, setTableCapacity] = useState("");
    const [weekdayOpeningHour, setWeekdayOpeningHour] = useState("");
    const [weekdayOpeningMinute, setWeekdayOpeningMinute] = useState("");
    const [weekdayClosingHour, setWeekdayClosingHour] = useState("");
    const [weekdayClosingMinute, setWeekdayClosingMinute] = useState("");
    const [weekendOpeningHour, setWeekendOpeningHour] = useState("");
    const [weekendOpeningMinute, setWeekendOpeningMinute] = useState("");
    const [weekendClosingHour, setWeekendClosingHour] = useState("");
    const [weekendClosingMinute, setWeekendClosingMinute] = useState("");


    const [edited, setEdited] = useState(false);

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    useEffect(() => {
        setName(restaurantDetails?.restaurantName);
        setDesc(restaurantDetails?.restaurantDesc);
        setLocation(restaurantDetails?.restaurantLocation);
        setPriceRange(restaurantDetails?.restaurantPriceRange);
        setTableCapacity(restaurantDetails?.restaurantTableCapacity);
        setWeekdayOpeningHour(('00' + restaurantDetails?.restaurantWeekdayOpeningHour).slice(-2));
        setWeekdayOpeningMinute(('00' + restaurantDetails?.restaurantWeekdayOpeningMinutes).slice(-2));
        setWeekdayClosingHour(('00' + restaurantDetails?.restaurantWeekdayClosingHour).slice(-2));
        setWeekdayClosingMinute(('00' + restaurantDetails?.restaurantWeekdayClosingMinutes).slice(-2));
        setWeekendOpeningHour(('00' + restaurantDetails?.restaurantWeekendOpeningHour).slice(-2));
        setWeekendOpeningMinute(('00' + restaurantDetails?.restaurantWeekendOpeningMinutes).slice(-2));
        setWeekendClosingHour(('00' + restaurantDetails?.restaurantWeekendClosingHour).slice(-2));
        setWeekendClosingMinute(('00' + restaurantDetails?.restaurantWeekendClosingMinutes).slice(-2));
    }, [restaurantDetails])

    const editRestaurantDetails = () => {
        setLoading(true);
        const response = RestaurantService.editRestaurantDetails(restaurantDetails.restaurantId,
            name, desc, location, priceRange, tableCapacity, weekdayOpeningHour, weekdayOpeningMinute,
            weekdayClosingHour, weekdayClosingMinute, weekendOpeningHour, weekdayOpeningMinute,
            weekendClosingHour, weekendClosingMinute);
        response.then((res) => {
            console.log(res);
            if (res.status === 200) {
                setError("")
                setEdited(true);
            } else {
                setError(res.data.message[0])
            }
            setLoading(false);
        })
        console.log(response);
    }

    return (
        <ReactModal style={customStyles} isOpen={editDetails} className="mt-6 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 m-8 rounded-lg shadow py-4 bg-white-standard mx-auto px-3 relative w-3/6">
                <button className="absolute top-5 right-5 rounded-full hover:bg-grey-lightest shadow-sm p-2 bg-gray-200" onClick={() => setEditDetails(false)}> <AiOutlineClose className="h-4 w-4" /> </button>
                <img className="h-48 mx-auto" src="/images/createPic2.png" alt="create" />
                <div className="grid grid-cols-7 px-12 mb-3 justify-center">
                    <h1 className="col-span-3 flex text-3xl text-green-standard font-bold">Edit Restaurant</h1>
                    <h1 className="col-span-4 flex mb-2 text-grey-standard font-light text-sm my-auto ml-auto">*Please only edit those fields you wish to change.</h1>
                </div>
                <div className="grid gap-y-3 grid-cols-2 gap-x-4 mx-12">
                    <div className="flex gap-x-2 justify-between">
                        <div className="text-base my-auto w-full">Name: </div>
                        <input className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div className="text-base my-auto w-full">Description: </div>
                        <input className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" value={desc} onChange={(e) => { setDesc(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div className="text-base my-auto w-full">Location:</div>
                        <input className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" value={location} onChange={(e) => { setLocation(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div className="text-base my-auto w-full">Price Range(1-5):</div>
                        <input type="number" min="1" max="5" className="focus:outline-none w-full rounded-large shadow-sm h-9 border border-grey-lightest px-4" value={priceRange} onChange={(e) => { setPriceRange(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div className="text-base my-auto w-full">Table Capacity:</div>
                        <input type="number" min="1" className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" value={tableCapacity} onChange={(e) => { setTableCapacity(e.target.value) }}></input>
                    </div>
                </div>

                <div className="grid gap-y-5 grid-cols-7 mx-12 mt-2">
                    <h1 className="mt-2 text-base col-span-2">Weekday Opening Hours (24H)</h1>
                    <div className="col-span-5 gap-x-8 flex my-auto">
                        <div className="flex gap-x-2 justify-center ml-auto">
                            <div className="my-auto text-base text-green-standard">From</div>
                            <input type="number" min="0" max="23" className="focus:outline-none px-2 rounded-large shadow-sm h-9 border border-grey-lightest w-16 my-auto" value={weekdayOpeningHour} onChange={(e) => { setWeekdayOpeningHour(('00' + e.target.value).slice(-2)) }}></input>
                            :
                            <input type="number" min="0" max="59" className="focus:outline-none px-2 rounded-large shadow-sm h-9 border border-grey-lightest w-16 my-auto" value={weekdayOpeningMinute} onChange={(e) => { setWeekdayOpeningMinute(('00' + e.target.value).slice(-2)) }}></input>
                        </div>
                        <div className="flex gap-x-2 justify-center">
                            <div className="my-auto text-base text-green-standard">To</div>
                            <input type="number" min="0" max="23" className="focus:outline-none px-2 rounded-large shadow-sm h-9 border border-grey-lightest w-16 my-auto" value={weekdayClosingHour} onChange={(e) => { setWeekdayClosingHour(('00' + e.target.value).slice(-2)) }}></input>
                            :
                            <input type="number" min="0" max="59" className="focus:outline-none px-2 rounded-large shadow-sm h-9 border border-grey-lightest w-16 my-auto" value={weekdayClosingMinute} onChange={(e) => { setWeekdayClosingMinute(('00' + e.target.value).slice(-2)) }}></input>

                        </div>
                    </div>
                </div>

                <div className="grid gap-y-5 grid-cols-7 mx-12 mt-2">
                    <h1 className="mt-2 text-base col-span-2">Weekend Opening Hours (24H)</h1>
                    <div className="col-span-5 gap-x-8 flex my-auto">
                        <div className="flex gap-x-2 justify-center ml-auto">
                            <div className="my-auto text-base text-green-standard">From</div>
                            <input type="number" min="0" max="23" className="focus:outline-none px-2 rounded-large shadow-sm h-9 border border-grey-lightest w-16 my-auto" value={weekendOpeningHour} onChange={(e) => { setWeekendOpeningHour(('00' + e.target.value).slice(-2)) }}></input>
                            :
                            <input type="number" min="0" max="59" className="focus:outline-none px-2 rounded-large shadow-sm h-9 border border-grey-lightest w-16 my-auto" value={weekendOpeningMinute} onChange={(e) => { setWeekendOpeningMinute(('00' + e.target.value).slice(-2)) }}></input>
                        </div>
                        <div className="flex gap-x-2 justify-center">
                            <div className="my-auto text-base text-green-standard">To</div>
                            <input type="number" min="0" max="23" className="focus:outline-none px-2 rounded-large shadow-sm h-9 border border-grey-lightest w-16 my-auto" value={weekendClosingHour} onChange={(e) => { setWeekendClosingHour(('00' + e.target.value).slice(-2)) }}></input>
                            :
                            <input type="number" min="0" max="59" className="focus:outline-none px-2 rounded-large shadow-sm h-9 border border-grey-lightest w-16 my-auto" value={weekendClosingMinute} onChange={(e) => { setWeekendClosingMinute(('00' + e.target.value).slice(-2)) }}></input>
                        </div>
                    </div>
                </div>

                {
                    (edited ?
                        <>
                            <div className="px-12 py-2 text-green-standard text-center">Restaurant Details have been updated!</div>
                            <div className=" grid gap-x-10 mx-12">
                                <button className=" text-white-standard bg-green-standard px-10 py-1 rounded-lg shadow-md hover:shadow-lg w-52 mx-auto"
                                    onClick={() => { setEditDetails(false); setEdited(false); }}>Return</button>
                            </div>
                        </> :
                        <>
                            <div className=" grid grid-cols-2 gap-x-10 justify-center mx-12 pt-4 gap-y-3">
                                <div className="text-red-standard text-center col-span-2">{error}</div>
                                <button className="text-white-standard bg-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg"
                                    onClick={() => { editRestaurantDetails() }} >
                                    <span>
                                        {
                                            loading ?
                                                <BeatLoader size="9" color="#daeddb" />
                                                : 'Confirm'
                                        }
                                    </span>
                                </button>
                                <button className="text-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg border border-green-standard" onClick={() => setEditDetails(false)}>Cancel</button>
                            </div>
                        </>)
                }
            </div>

        </ReactModal>
    )
}

export default EditRestaurantDetails
