import React, { useState } from 'react'
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import AdminService from '../services/AdminService';

const CreateManagerModal = (props: any) => {

    const { createManager, setCreateManager } = props;
    const [userId, setUserId] = useState(0);
    const [restaurantId, setRestaurantId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [created, setCreated] = useState(false);

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const makeManager = () => {
        console.log(userId);
        console.log(restaurantId);
        setError("");
        setLoading(true);
        if (userId === 0 || restaurantId === 0) {
            setLoading(false);
            setError("Invalid inputs")
        }

        AdminService.makeManager(userId, restaurantId).then((response) => {
            console.log(response);
            setCreated(true);
            setLoading(false);
        }).catch((error) => {
            console.log(error.response);
            setError(error.response.data.message);
            setLoading(false);
            setCreated(false);
        })

    }

    return (
        <Modal style={customStyles} isOpen={createManager} className="flex mt-24 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 m-8 rounded-lg shadow py-10 bg-white-dirtyWhite mx-auto px-20 relative">
                <button className="absolute top-3 right-3 " onClick={() => setCreateManager(false)}> <AiOutlineClose className="h-5 w-5" /> </button>
                <h1 className=" flex text-5xl text-green-standard font-bold mx-auto">Make Manager</h1>
                <h1 className=" flex text-base mb-2 text-grey-standard font-light mx-auto">An existing user is required to be converted to Manager. </h1>
                <div className="grid gap-y-4 pb-2">
                    <div className="flex gap-x-2 justify-between">
                        <div>User ID: </div>
                        <input className="focus:outline-none px-4 py-0.5 rounded-large shadow-sm" placeholder="Existing User ID"
                            onChange={(e) => {
                                setUserId(JSON.parse(e.target.value))
                            }} />
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Restaurant ID: </div>
                        <input className="focus:outline-none px-4 py-0.5 rounded-large shadow-sm" placeholder="Restaurant ID"
                            onChange={(e) => {
                                setRestaurantId(JSON.parse(e.target.value))
                            }} />
                    </div>
                </div>
                {
                    (error ? <div className="mx-auto text-red-standard">{error}</div> : <></>)
                }
                {
                    (created ?
                        <>
                            <div className="mx-auto pt-3 pb-3 text-green-standard text-base">User with id: {userId} is now Manager of Restaurant with id: {restaurantId}</div>
                            <div className="pt-2 pb-0 grid grid-cols-2 gap-x-10 justify-center mx-28">
                                <button className=" text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                    onClick={() => {
                                        setCreated(false);
                                        setUserId(0);
                                        setRestaurantId(0);
                                        setError("")
                                    }}>Reset</button>
                                <button className=" text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg border"
                                    onClick={() => {
                                        setCreateManager(false);
                                        setCreated(false);
                                        setUserId(0);
                                        setRestaurantId(0);
                                        setError("")
                                    }}>Return</button>
                            </div>
                        </> :
                        <div className="pt-2 grid grid-cols-2 gap-x-10 justify-center mx-28">
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-sm hover:shadow-md"
                                onClick={() => makeManager()}>
                                <span>
                                    {
                                        loading ?
                                            <div className="spinner" id="spinner" />
                                            : 'Confirm'
                                    }
                                </span>
                            </button>
                            <button className="text-green-standard px-3 py-1 rounded-xl shadow-sm hover:shadow-md border border-green-standard"
                                onClick={() => {
                                    setCreateManager(false);
                                    setCreated(false);
                                    setUserId(0);
                                    setRestaurantId(0);
                                    setError("")
                                }
                                }
                            >Cancel</button>
                        </div>)
                }
            </div>

        </Modal>
    )
}

export default CreateManagerModal
