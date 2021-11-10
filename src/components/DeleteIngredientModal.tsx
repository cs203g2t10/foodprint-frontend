import { useState } from 'react'
import ReactModal from 'react-modal';
import RestaurantService from '../services/RestaurantService';

const DeleteIngredientModal = (props: any) => {

    const {deleteModalOpen, setDeleteModal, name, id } = props;
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const deleteIngredient: any = async () => {
        setError("");
        setLoading(true);
        const response =  RestaurantService.deleteIngredient(props.restaurantId, id);
        response.then(res => {
            setDeleted(true);
            setLoading(false);
        }).catch(err => {
            console.log(err.response);
            setError(err.response.data.message);
            setLoading(false);
        })
    }

    return (
        <ReactModal style={customStyles} isOpen={deleteModalOpen} className="focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 rounded-xxl shadow w-1/3 mx-auto pb-10 pt-12 mt-24 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl text-green-standard font-bold mx-auto">Delete Ingredient</h1>
                <h1 className=" flex text-md mb-2 text-grey-standard font-light mx-auto">Are you sure you want to delete {name}?</h1>
                {
                    (deleted ?
                        <>
                            <div className="mx-auto pb-2 text-green-standard">{name} has been successfully deleted!</div>
                            <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28">
                                <button className="col-span-2 text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg border border-green-standard"
                                    onClick={() => { setDeleteModal(false) }}>Return</button>
                            </div>
                        </> :
                        <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28 pt-4">
                            <div className="col-span-2 text-red-standard text-center pb-4" >{error}</div>
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                            onClick={()=>{deleteIngredient()}}>
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

export default DeleteIngredientModal
