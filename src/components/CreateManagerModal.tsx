import React, { useState } from 'react'
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import AdminService from '../services/AdminService';
import { BeatLoader } from 'react-spinners';

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
        <Modal style={customStyles} isOpen={createManager} className="flex mt-14 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 rounded-lg shadow py-10 bg-white-standard mx-auto px-6 relative w-2/6">
                <button className="absolute top-5 right-5 rounded-full hover:bg-grey-lightest shadow-sm p-2 bg-gray-200" onClick={() => setCreateManager(false)}> <AiOutlineClose className="h-4 w-4" /> </button>
                <img className="px-5 h-56 mx-auto" src="/images/invite.png" alt="create" />
                <h1 className=" flex text-3xl text-green-standard font-bold px-10 mt-3">Make Manager</h1>
                <h1 className=" flex text-base mb-2 text-grey-standard font-light px-10">An existing user is required to be converted to Manager. </h1>
                <div className="grid gap-y-3 pb-2 px-10">
                    <div className="flex gap-x-2 justify-between">
                        <div className="my-auto"> User ID: </div>
                        <input className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" placeholder="Existing User ID"
                            onChange={(e) => {
                                setUserId(JSON.parse(e.target.value))
                            }} />
                    </div>
                    <div className="flex gap-x-2 justify-between pb-3">
                        <div className="my-auto">Restaurant ID: </div>
                        <input className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" placeholder="Restaurant ID"
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
                            <div className="pb-1 px-10 text-green-standard text-base">User is now a Manager</div>
                            <div className="pt-2 pb-0 grid grid-cols-2 gap-x-10 justify-center mx-10">
                                <button className=" text-white-standard bg-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg w-full"
                                    onClick={() => {
                                        setCreated(false);
                                        setUserId(0);
                                        setRestaurantId(0);
                                        setError("")
                                    }}>Reset</button>
                                <button className=" text-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg border border-green-standard w-full"
                                    onClick={() => {
                                        setCreateManager(false);
                                        setCreated(false);
                                        setUserId(0);
                                        setRestaurantId(0);
                                        setError("");
                                        window.location.reload();
                                    }}>Return</button>
                            </div>
                        </> :
                        <div className="pt-2 grid grid-cols-2 gap-x-10 justify-center px-10">
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-lg shadow-sm hover:shadow-md w-full"
                                onClick={() => makeManager()}>
                                <span>
                                    {
                                        loading ?
                                            <BeatLoader size="9" color="#daeddb" />
                                            : 'Confirm'
                                    }
                                </span>
                            </button>
                            <button className="text-green-standard px-3 py-1 rounded-lg shadow-sm hover:shadow-md border border-green-standard"
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
