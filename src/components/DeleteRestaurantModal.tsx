import React, { useState } from 'react'
import ReactModal from 'react-modal'
import { BeatLoader } from 'react-spinners';
import { AiOutlineClose } from 'react-icons/ai';
import RestaurantService from '../services/RestaurantService';

const DeleteRestaurantModal = (props:any) => {

    const {deleteRestaurantModal, setDeleteRestaurantModal} = props;
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const deleteRestaurant: any = (id:number) => {
        setLoading(true);
        setError("");
        console.log(id);
        const response = RestaurantService.deleteRestaurant(id);
        response.then((res) => {
            console.log(res);
            setDeleted(true);
            setLoading(false);
        }).catch(err => {
            console.log(err.response);
            setError(err.response.data.message);
            setLoading(false);
        })
    }

    return (
        <ReactModal style={customStyles} isOpen={deleteRestaurantModal} className="mt-10 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 rounded-lg shadow w-1/3 mx-auto pb-10 pt-6 mt-24 bg-white-standard relative">
                <button className="absolute top-5 right-5 rounded-full hover:bg-grey-lightest shadow-sm p-2 bg-gray-200" onClick={() => setDeleteRestaurantModal(false)}> <AiOutlineClose className="h-4 w-4" /> </button>
                <img className="px-5 h-56 mx-auto" src="/images/delete.png" alt="create" />
                <h1 className="flex text-3xl text-green-standard font-bold px-16 mt-3">Delete Restaurant</h1>
                <h1 className="flex text-base mb-2 text-grey-standard font-light px-16">Are you sure you want to delete this restaurant:</h1>
                <div className="justify-center items-center px-16">
                    <div className="grid grid-cols-3">
                        <div>
                            <h1 className=" text-base text-grey-dark font-light">Restaurant ID:</h1>
                            <h1 className=" text-base text-grey-dark font-light">Name: </h1>
                        </div>
                        <div>
                            <h1 className="text-base text-right text-grey-standard font-light">{props.restaurantId}</h1>
                            <h1 className="text-base text-right text-grey-standard font-light">{props.restaurantName}</h1>
                        </div>
                    </div>
                </div>
                {
                    deleted ?
                        <>
                            <div className="mx-16 text-green-standard">Restaurant with ID {props.restaurantId} has been deleted!</div>
                            <div className="mx-16">
                                <button className="text-white-standard py-1 rounded-lg shadow-md hover:shadow-lg border border-green-standard bg-green-standard text-center w-full" 
                                onClick={() => {setDeleteRestaurantModal(false); window.location.reload();}}>Return</button>
                            </div>
                        </> :
                        <div className="grid grid-cols-2 gap-x-8 justify-center mx-16">
                            <div className="col-span-2 text-red-standard pb-2">{error}</div>
                            <button className="text-white-standard bg-green-standard px-4 py-1 rounded-lg  shadow-md hover:shadow-lg"
                                onClick={() => deleteRestaurant(props.restaurantId)}>
                                {
                                    loading ? <BeatLoader size="9" color="#daeddb" />
                                        : 'Confirm'
                                }
                            </button>
                            <button className="text-green-standard border border-green-standard px-4 py-1 rounded-lg shadow-md hover:shadow-lg" onClick={() => setDeleteRestaurantModal(false)}>Cancel</button>
                        </div>
                }
            </div>
        </ReactModal>
    )
}

export default DeleteRestaurantModal
