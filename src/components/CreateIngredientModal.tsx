import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';
import { BeatLoader } from 'react-spinners';
import RestaurantService from '../services/RestaurantService';

Modal.setAppElement('#root')

const CreateIngredientModal = (props: any) => {

    const { createIngredient, setCreateIngredient, restaurantId } = props;
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [units, setUnits] = useState("");
    const [created, setCreated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const createNewIngredient = (name: string, desc: string, units: string) => {
        setError("");
        setLoading(true);
        const response = RestaurantService.createIngredient(restaurantId, name, desc, units);
        response.then((res: any) => {
            console.log(res)
            if (res.status === 201) {
                console.log("Successful Creation");
                console.log(res.data);
                setCreated(true);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err.response);
            setError(err.response.data.message[0]);
            setLoading(false);
        })
    }

    return (
        <Modal style={customStyles} isOpen={createIngredient} className="mt-16 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 rounded-lg shadow py-6 bg-white-standard mx-auto px-6 relative w-2/6">
                <button className="absolute top-5 right-5 rounded-full hover:bg-grey-lightest shadow-sm p-2 bg-gray-200" onClick={() => setCreateIngredient(false)}> <AiOutlineClose className="h-5 w-5" /> </button>
                <img className="px-5 h-44 mx-auto" src="/images/createIngre.png" alt="create" />
                <h1 className="flex text-3xl text-green-standard font-bold px-6 mt-3">Create Ingredient</h1>
                <h1 className=" flex text-base text-grey-standard font-light mx-6">Please fill up all details below </h1>
                <div className="grid md:mt-3 gap-y-2 mx-6">
                    <div className="flex gap-x-2 justify-between">
                        <div>Ingredient Name: </div>
                        <input type="text" className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Ingredient Description: </div>
                        <input type="text" className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" value={desc} onChange={(e) => { setDesc(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Unit of Measure: </div>
                        <input type="text" className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest" value={units} onChange={(e) => { setUnits(e.target.value) }}></input>
                    </div>
                </div>

                {
                    (created ?
                        <>
                            <div className="pt-7 pb-2 mx-6 text-green-standard">Ingredient has been successfully created!</div>
                            <div className=" grid grid-cols-2 gap-x-6 justify-center mx-6">
                                <button className=" text-white-standard bg-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg"
                                    onClick={() => {
                                        setCreated(false);
                                        setName("");
                                        setDesc("");
                                        setUnits("");
                                    }}>Reset</button>
                                <button className=" text-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg border border-green-standard"
                                    onClick={() => { setCreateIngredient(false) }}>Return</button>
                            </div>
                        </> :
                        <div className="mx-6 grid grid-cols-2 gap-x-6 justify-center pt-3">
                            <div className="col-span-2 text-red-standard pb-4">{error}</div>
                            <button className="text-white-standard bg-green-standard px-4 py-1 rounded-lg shadow-md hover:shadow-lg"
                                onClick={() => createNewIngredient(name, desc, units)}>
                                {
                                    loading ? <BeatLoader size="9" color="#daeddb" />
                                        : 'Confirm'
                                }
                            </button>

                            <button className="border border-green-standard text-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg" onClick={() => setCreateIngredient(false)}>
                                Cancel
                            </button>
                        </div>)
                }
            </div>

        </Modal>
    )
}

export default CreateIngredientModal
