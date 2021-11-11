import { useState } from 'react'
import ReactModal from 'react-modal';
import { BeatLoader } from 'react-spinners';
import RestaurantService from '../services/RestaurantService';

const CreateRestaurantModal = (props: any) => {

    const { createRestaurant, setCreateRestaurant } = props;

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

    const [created, setCreated] = useState(false);

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const editRestaurantDetails = () => {
        setLoading(true);
        const response = RestaurantService.createRestaurant(
            name, desc, location, priceRange, tableCapacity, weekdayOpeningHour, weekdayOpeningMinute,
            weekdayClosingHour, weekdayClosingMinute, weekendOpeningHour, weekdayOpeningMinute,
            weekendClosingHour, weekendClosingMinute);
        response.then((res) => {
            console.log(res);
            if (res.status === 201) {
                setError("")
                setCreated(true);
            } else {
                setError(res.data.message[0])
            }
            setLoading(false);
        })
        console.log(response);
    }

    return (
        <ReactModal style={customStyles} isOpen={createRestaurant} className="mt-6 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 m-8 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl pt-5 text-green-standard font-bold mx-auto">New Restaurant Details</h1>
                <h1 className=" flex text-md mb-2 text-grey-standard font-light mx-auto">All fields are compulsory.</h1>
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
                        <input type="number" min="1" max="5" className="focus:outline-none px-2 rounded w-1/2" value={priceRange} onChange={(e) => { setPriceRange(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Table Capacity:</div>
                        <input type="number" min="1" className="focus:outline-none px-2 rounded" value={tableCapacity} onChange={(e) => { setTableCapacity(e.target.value) }}></input>
                    </div>
                </div>

                <h1 className="text-lg mt-2 text-green-standard text-center">Weekday Opening Hours (24H)</h1>
                <div className="grid gap-y-5 grid-cols-2">
                    <div className="flex gap-x-2 justify-center">
                        <div>From</div>
                        <input type="number" min="0" max="23" className="focus:outline-none px-2 rounded" value={weekdayOpeningHour} onChange={(e) => { setWeekdayOpeningHour(('00'+e.target.value).slice(-2)) }}></input>
                        :
                        <input type="number" min="0" max="59" className="focus:outline-none px-2 rounded" value={weekdayOpeningMinute} onChange={(e) => { setWeekdayOpeningMinute(('00'+e.target.value).slice(-2)) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-center">
                        <div>To</div>
                        <input type="number" min="0" max="23" className="focus:outline-none px-2 rounded" value={weekdayClosingHour} onChange={(e) => { setWeekdayClosingHour(('00'+e.target.value).slice(-2)) }}></input>
                        :
                        <input type="number" min="0" max="59" className="focus:outline-none px-2 rounded" value={weekdayClosingMinute} onChange={(e) => { setWeekdayClosingMinute(('00'+e.target.value).slice(-2)) }}></input>

                    </div>
                </div>


                <h1 className="text-lg mt-4 text-green-standard text-center ">Weekend Opening Hours (24H)</h1>
                <div className="grid gap-y-5 grid-cols-2">
                    <div className="flex gap-x-2 justify-center">
                        <div>From</div>
                        <input type="number" min="0" max="23" className="focus:outline-none px-2 rounded" value={weekendOpeningHour} onChange={(e) => { setWeekendOpeningHour(('00'+e.target.value).slice(-2)) }}></input>
                        :
                        <input type="number" min="0" max="59" className="focus:outline-none px-2 rounded" value={weekendOpeningMinute} onChange={(e) => { setWeekendOpeningMinute(('00'+e.target.value).slice(-2)) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-center">
                        <div>To</div>
                        <input type="number" min="0" max="23" className="focus:outline-none px-2 rounded" value={weekendClosingHour} onChange={(e) => { setWeekendClosingHour(('00'+e.target.value).slice(-2)) }}></input>
                        :
                        <input type="number" min="0" max="59" className="focus:outline-none px-2 rounded" value={weekendClosingMinute} onChange={(e) => { setWeekendClosingMinute(('00'+e.target.value).slice(-2)) }}></input>
                    </div>
                </div>

                {
                    (created ?
                        <>
                            <div className="mx-auto py-2 text-green-standard">Restaurant has been created!</div>
                            <div className=" grid gap-x-10 justify-center mx-28">
                                <button className=" text-green-standard px-10 py-1 rounded-xl shadow-md hover:shadow-lg"
                                    onClick={() => { setCreateRestaurant(false); setCreateRestaurant(false); }}>Return</button>
                            </div>
                        </> :
                        <>
                            <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28 pt-4 gap-y-3">
                                <div className="text-red-standard text-center col-span-2">{error}</div>
                                <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                    onClick={() => { editRestaurantDetails() }} >
                                    <span>
                                        {
                                            loading ? 
                                            <BeatLoader size="9" color="#daeddb"/>
                                            : 'Confirm'
                                        }
                                    </span>
                                </button>
                                <button className="text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg" onClick={() => setCreateRestaurant(false)}>Cancel</button>
                            </div>
                        </>)
                }
            </div>

        </ReactModal>
    )
}

export default CreateRestaurantModal
