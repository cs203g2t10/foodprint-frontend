import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import { BeatLoader } from 'react-spinners';
import RestaurantService from '../services/RestaurantService';

const DiscountModal = (props: any) => {

    const { editDiscount, setEditDiscount } = props;
    const [discount, setDiscount] = useState(0);
    const [newDiscount, setNewDiscount] = useState(0);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [restaurantId, setRestaurantId] = useState(0);

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    useEffect(() => {
        if (props.discount === null) {
            setDiscount(0);
        } else {
            setDiscount(props.discount);
        }
    }, [props.discount]);

    useEffect(() => {
        setRestaurantId(props.restaurantId);
    }, [props.restaurantId])

    const makeDiscount = () => {
        console.log(discount)
        setLoading(true);
        console.log(newDiscount);
        if (props.discount === null) {
            console.log('hello')
        }
        const response = props.discount === null ?
            RestaurantService.makeNewDiscount(restaurantId, newDiscount)
            : RestaurantService.editDiscount(restaurantId, newDiscount);

        response.then((response) => {
            console.log(response);
            setLoading(false);
            setSuccess(true);
        }).catch((error) => {
            console.log(error.response);
            setError(error.response.data.message);
        })
    }

    return (
        <Modal style={customStyles} isOpen={editDiscount} className="flex mt-12 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 rounded-lg shadow py-10 bg-white-standard mx-auto px-6 relative w-2/5">
                <button className="absolute top-5 right-5 rounded-full hover:bg-grey-lightest shadow-sm p-2 bg-gray-200" onClick={() => setEditDiscount(false)}> <AiOutlineClose className="h-4 w-4" /> </button>
                <img className="px-5 h-44 mx-auto" src="/images/createIngre.png" alt="create" />
                <div className="px-10 grid gap-y-2">
                    <h1 className=" flex text-3xl text-green-standard font-bold  mt-3">Set Discount</h1>
                    <h1 className=" flex text-base text-grey-standard font-light ">Set a discount for your restaurant!</h1>
                    <div className="grid grid-cols-2 justify-between gap-x-2 gap-y-2">
                        <h1 className=" flex text-base text-left">Current Discount:</h1>
                        <h1 className=" flex text-base">{discount}%</h1>
                        <div className="my-auto">New Discount: </div>
                        <input className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" placeholder="Discount in %"
                            onChange={(e) => {
                                setNewDiscount(JSON.parse(e.target.value))
                            }} />
                    </div>
                </div>
                {
                    (error ? <div className="mx-auto text-red-standard">{error}</div> : <></>)
                }
                {
                    (success ?
                        <>
                            <div className="mx-auto pt-3 pb-3 px-10 text-green-standard text-base">Discount of {newDiscount}% has been set for Restaurant with id: {restaurantId}</div>
                            <div className="pt-2 pb-0 grid grid-cols-2 gap-x-10 justify-center mx-10">
                                <button className=" text-white-standard bg-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg w-full"
                                    onClick={() => {
                                        setSuccess(false);
                                        setError("")
                                        setNewDiscount(0);
                                    }}>Reset</button>
                                <button className=" text-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg border border-green-standard w-full"
                                    onClick={() => {
                                        setEditDiscount(false);
                                        setSuccess(false);
                                        setError("");
                                        setNewDiscount(0);
                                    }}>Return</button>
                            </div>
                        </> :
                        <div className="pt-2 grid grid-cols-2 gap-x-10 justify-center px-10">
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-lg shadow-sm hover:shadow-md w-full"
                                onClick={() => makeDiscount()}>
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
                                    setEditDiscount(false);
                                    setSuccess(false);
                                    setNewDiscount(0);
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

export default DiscountModal
