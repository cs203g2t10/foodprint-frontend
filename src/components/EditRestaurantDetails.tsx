import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal';
import RestaurantService from '../services/RestaurantService';

const EditRestaurantDetails = (props: any) => {

    const { editDetails, setEditDetails, restaurantDetails } = props;

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
        setWeekdayOpeningHour(restaurantDetails?.restaurantWeekdayOpeningHour);
        setWeekdayOpeningMinute(restaurantDetails?.restaurantWeekdayOpeningMinutes);
        setWeekdayClosingHour(restaurantDetails?.restaurantWeekdayClosingHour);
        setWeekdayClosingMinute(restaurantDetails?.restaurantWeekdayClosingMinutes);
        setWeekendOpeningHour(restaurantDetails?.restaurantWeekendOpeningHour);
        setWeekendOpeningMinute(restaurantDetails?.restaurantWeekendOpeningMinutes);
        setWeekendClosingHour(restaurantDetails?.restaurantWeekendClosingHour);
        setWeekendClosingMinute(restaurantDetails?.restaurantWeekendClosingMinutes);
    }, [restaurantDetails])

    const editRestaurantDetails = () => {
        const response = RestaurantService.editRestaurantDetails(restaurantDetails.restaurantId,
            name, desc, location, priceRange, tableCapacity, weekdayOpeningHour, weekdayOpeningMinute,
            weekdayClosingHour, weekdayClosingMinute, weekendOpeningHour, weekdayOpeningMinute,
            weekendClosingHour, weekendClosingMinute);
        response.then((res) => {
            console.log(res.data);
            setEdited(true);
        }).catch((error) => {
            console.log("Unsuccessful Edit")
            console.log(error);
        })
    }

    return (
        <ReactModal style={customStyles} isOpen={editDetails} className="mt-6 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 m-8 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl pt-5 text-green-standard font-bold mx-auto">Edit Restaurant Details</h1>
                <h1 className=" flex text-md mb-2 text-grey-standard font-light mx-auto">Please edit only those fields you wish to change </h1>
                <div className="grid gap-y-5 grid-cols-2 gap-x-10">
                    <div className="flex gap-x-2 justify-between">
                        <div>Name: </div>
                        <input className="focus:outline-none px-2 rounded" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Description: </div>
                        <input className="focus:outline-none px-2 rounded" value={desc} onChange={(e) => { setDesc(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Location:</div>
                        <input className="focus:outline-none px-2 rounded" value={location} onChange={(e) => { setLocation(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Price Range (1-5):</div>
                        <input type="number" min="1" max="5" className="focus:outline-none px-2 rounded" value={priceRange} onChange={(e) => { setPriceRange(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Table Capacity:</div>
                        <input type="number" min="1" className="focus:outline-none px-2 rounded" value={tableCapacity} onChange={(e) => { setTableCapacity(e.target.value) }}></input>
                    </div>
                </div>

                <h1 className="text-md mt-4 text-green-standard font-light text-center">Opening Hours (WEEKDAY)</h1>
                <div className="grid gap-y-5 grid-cols-2 gap-x-10">
                    <div className="flex gap-x-2 justify-center">
                        <div>Opening Hour: </div>
                        <input type="number" min="0" max="23" className="focus:outline-none px-2 rounded" value={weekdayOpeningHour} onChange={(e) => { setWeekdayOpeningHour(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-center">
                        <div>Opening Minute: </div>
                        <input type="number" min="0" max="59" className="focus:outline-none px-2 rounded" value={weekdayOpeningMinute} onChange={(e) => { setWeekdayOpeningMinute(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-center">
                        <div>Closing Hour:</div>
                        <input type="number" min="0" max="23" className="focus:outline-none px-2 rounded" value={weekdayClosingHour} onChange={(e) => { setWeekdayClosingHour(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-center">
                        <div>Closing Minute:</div>
                        <input type="number" min="0" max="59" className="focus:outline-none px-2 rounded" value={weekdayClosingMinute} onChange={(e) => { setWeekdayClosingMinute(e.target.value) }}></input>
                    </div>
                </div>


                <h1 className="text-md mt-4 text-green-standard font-light text-center">Opening Hours (WEEKEND)</h1>
                <div className="grid gap-y-5 grid-cols-2 gap-x-10">
                    <div className="flex gap-x-2 justify-center">
                        <div>Opening Hour: </div>
                        <input type="number" min="0" max="23" className="focus:outline-none px-2 rounded" value={weekendOpeningHour} onChange={(e) => { setWeekendOpeningHour(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-center">
                        <div>Opening Minute: </div>
                        <input type="number" min="0" max="59" className="focus:outline-none px-2 rounded" value={weekendOpeningMinute} onChange={(e) => { setWeekendOpeningMinute(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-center">
                        <div>Closing Hour:</div>
                        <input type="number" min="0" max="23" className="focus:outline-none px-2 rounded" value={weekendClosingHour} onChange={(e) => { setWeekendClosingHour(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-center">
                        <div>Closing Minute:</div>
                        <input type="number" min="0" max="59" className="focus:outline-none px-2 rounded" value={weekendClosingMinute} onChange={(e) => { setWeekendClosingMinute(e.target.value) }}></input>
                    </div>
                </div>

                {
                    (edited ?
                        <>
                            <div className="mx-auto py-2">Restaurant Details have been updated!</div>
                            <div className=" grid gap-x-10 justify-center mx-28">
                                <button className=" text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                    onClick={() => { setEditDetails(false); setEdited(false); }}>Return</button>
                            </div>
                        </> :
                        <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28 pt-4">
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                            onClick={()=>{editRestaurantDetails()}} >Confirm</button>
                            <button className="text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg" onClick={() => setEditDetails(false)}>Cancel</button>
                        </div>)
                }
            </div>

        </ReactModal>
    )
}

export default EditRestaurantDetails
