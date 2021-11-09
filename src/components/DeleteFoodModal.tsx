import React, { useState } from 'react'
import ReactModal from 'react-modal';
import RestaurantService from '../services/RestaurantService';



const DeleteFoodModal = (props: any) => {

    const { deleteModalOpen, setDeleteModal, name } = props;
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const deleteFood = () => {
        setLoading(true);
        setError("")
        const response = RestaurantService.deleteFood(props.restaurantId, props.foodId);
        response.then((res) => {
            console.log(res);           
            setDeleted(true);
            setLoading(false);
        }).catch((error) => {
            console.log(error.response);
            setError(error.response.data.message);
            setLoading(false);
        })
    }

    return (
        <ReactModal style={customStyles} isOpen={deleteModalOpen} className="mt-10 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl pt-12 text-green-standard font-bold mx-auto">Delete Food</h1>
                <h1 className=" flex text-md mb-2 text-grey-standard font-light mx-auto">Are you sure you want to delete {name}?</h1>
                {
                    (deleted ?
                        <>
                            <div className="mx-auto pb-2">{name} has been successfully deleted!</div>
                            <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28">
                                <button className="col-span-2 text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg border border-green-standard"
                                    onClick={() => { setDeleteModal(false) }}>Return</button>
                            </div>
                        </> :
                        <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28 pt-4">
                            <div className="col-span-2 text-red-standard text-center pb-4" >{error}</div>
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                            onClick={()=>{deleteFood()}}>
                                <span>
                                    {
                                        loading ?
                                            <div className="spinner" id="spinner" />
                                            : 'Confirm'
                                    }
                                </span>
                            </button>
                            <button className="text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg border border-green-standard" onClick={() => setDeleteModal(false)}>Cancel</button>
                        </div>)
                }
            </div>
        </ReactModal>
    )
}

export default DeleteFoodModal
