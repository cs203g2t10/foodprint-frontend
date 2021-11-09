import React, { useState } from 'react'
import Modal from 'react-modal';
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
        <Modal style={customStyles} isOpen={createIngredient} className="mt-28 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl pt-12 text-green-standard font-bold mx-auto">Create Ingredient</h1>
                <h1 className=" flex text-md mb-2 text-grey-standard font-light mx-auto">Please fill up all details below </h1>
                <div className="grid gap-y-5 grid-cols-1 mt-10 gap-x-10">
                    <div className="flex gap-x-2 justify-between">
                        <div>Ingredient Name: </div>
                        <input type="text" className="focus:outline-none px-4 h-8 rounded-xl " value={name} onChange={(e) => { setName(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Ingredient Description: </div>
                        <input type="text" className="focus:outline-none px-4 h-8 rounded-xl " value={desc} onChange={(e) => { setDesc(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Unit of Measure: </div>
                        <input type="text" className="focus:outline-none px-4 h-8 rounded-xl " value={units} onChange={(e) => { setUnits(e.target.value) }}></input>
                    </div>
                </div>

                {
                    (created ?
                        <>
                            <div className="mx-auto pt-7 pb-2 text-green-standard">Ingredient has been successfully created!</div>
                            <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28">
                                <button className=" text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                    onClick={() => {
                                        setCreated(false);
                                        setName("");
                                        setDesc("");
                                        setUnits("");
                                    }}>Reset</button>
                                <button className=" text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg border border-green-standard"
                                    onClick={() => { setCreateIngredient(false) }}>Return</button>
                            </div>
                        </> :
                        <div className=" grid grid-cols-2 gap-x-10 justify-center pt-6">
                            <div className="col-span-2 text-red-standard text-center pb-2">{error}</div>
                            <button className="text-white-standard bg-green-standard px-4 py-1 rounded-xl shadow-md hover:shadow-lg"
                                onClick={() => createNewIngredient( name, desc, units)}>
                                    {
                                        loading ? <div className="spinner" id="spinner"/>
                                        : 'Confirm'
                                    }
                            </button>

                            <button className="border border-green-standard text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg" onClick={() => setCreateIngredient(false)}>
                                Cancel
                            </button>
                        </div>)
                }
            </div>

        </Modal>
    )
}

export default CreateIngredientModal
