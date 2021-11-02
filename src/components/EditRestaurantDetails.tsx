import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal';

const EditRestaurantDetails = (props:any) => {

    const {editDetails, setEditDetails, restaurantDetails} = props;

    const [name, setName] = useState(restaurantDetails?.restaurantName);
    const [desc, setDesc] = useState(restaurantDetails?.restaurantDesc);
    const [location, setLocation] = useState(restaurantDetails?.restaurantLocation);
    const [edited, setEdited] = useState(false);

    const customStyles = {
        overlay: { zIndex: 1000 }
    };



    return (
        <ReactModal style={customStyles} isOpen={editDetails} className="mt-10 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl pt-12 text-green-standard font-bold mx-auto">Edit Restaurant Details</h1>
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
                </div>

                {
                    (edited ?
                        <>
                            <div className="mx-auto pb-2">Item has been added to the menu!</div>
                            <div className=" grid gap-x-10 justify-center mx-28">
                                <button className=" text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                    onClick={() => { setEditDetails(false) }}>Return</button>
                            </div>
                        </> :
                        <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28 pt-4">
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                >Confirm</button>
                            <button className="text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg" onClick={() => setEditDetails(false)}>Cancel</button>
                        </div>)
                }
            </div>

        </ReactModal>
    )
}

export default EditRestaurantDetails
