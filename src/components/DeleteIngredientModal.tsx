import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import ReactModal from 'react-modal';
import { BeatLoader } from 'react-spinners';
import RestaurantService from '../services/RestaurantService';

const DeleteIngredientModal = (props: any) => {

    const { deleteModalOpen, setDeleteModal, name, id } = props;
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const deleteIngredient: any = async () => {
        setError("");
        setLoading(true);
        const response = RestaurantService.deleteIngredient(props.restaurantId, id);
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
            <div className="grid justify-center items-center gap-y-2 rounded-lg shadow w-1/3 mx-auto pb-10 pt-12 mt-24 bg-white-standard relative">
                <button className="absolute top-5 right-5 rounded-full hover:bg-grey-lightest shadow-sm p-2 bg-gray-200" onClick={() => setDeleteModal(false)}> <AiOutlineClose className="h-4 w-4" /> </button>
                <img className="px-5 h-44 mx-auto" src="/images/createIngre.png" alt="create" />
                <h1 className="flex text-3xl text-green-standard font-bold px-10 mt-3">Delete Ingredient</h1>
                <h1 className=" flex text-md mb-2 text-grey-standard font-light px-10">Are you sure you want to delete {name}?</h1>
                {
                    (deleted ?
                        <>
                            <div className="mx-auto pb-2 text-green-standard">{name} has been successfully deleted!</div>
                            <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28">
                                <button className="col-span-2 text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg border border-green-standard"
                                    onClick={() => { setDeleteModal(false) }}>Return</button>
                            </div>
                        </> :
                        <div className=" grid grid-cols-2 gap-x-8 justify-center mx-10">
                            <div className="col-span-2 text-red-standard text-center pb-4" >{error}</div>
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg"
                                onClick={() => { deleteIngredient() }}>
                                <span>
                                    {
                                        loading ?
                                            <BeatLoader size="9" color="#daeddb" />
                                            : 'Confirm'
                                    }
                                </span>
                            </button>
                            <button className="text-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg border border-green-standard" onClick={() => setDeleteModal(false)}>Cancel</button>
                        </div>)
                }
            </div>
        </ReactModal>
    )
}

export default DeleteIngredientModal
