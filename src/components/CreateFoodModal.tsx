import React, { useState } from 'react'
import ReactModal from 'react-modal'
import RestaurantService from '../services/RestaurantService';

const CreateFoodModal = (props: any) => {

    const { showCreateFood, setShowCreateFood, ingredients } = props;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [created, setCreated] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState<any>();
    const [ingredientQty, setIngredientQty] = useState<any>([]);
    const [restaurantId] = useState(props.restaurantId);

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const createNewFood = async (name: any, desc: any, price: any, ingredientQty: any) => {
        setLoading(true);
        const response = await RestaurantService.createFood(restaurantId, name, desc, price, ingredientQty);
        console.log(response);
        if (response.status === 201) {
            setCreated(true);
        } else {
            setError(response.data.message);
        }
        setLoading(false);
    }

    return (
        <ReactModal style={customStyles} isOpen={showCreateFood} className="mt-10 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-72 pb-10 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl pt-8 text-green-standard font-bold mx-auto">Add Food</h1>
                <h1 className=" flex text-md mb-2 text-grey-standard font-light mx-auto">Please fill up all details below </h1>
                <div className="grid gap-y-5 grid-cols-2 gap-x-10 mx-24">
                    <div className="flex gap-x-2 justify-between">
                        <div>Name: </div>
                        <input className="focus:outline-none px-4 rounded-xl h-8" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Price (SGD):</div>
                        <input type="number" className="focus:outline-none px-4 rounded-xl h-8" value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Description: </div>
                        <input className="focus:outline-none px-4 rounded-xl h-8" value={desc} onChange={(e) => { setDesc(e.target.value) }}></input>
                    </div>
                </div>

                <h1 className="flex text-md my-2 font-light mx-auto">Ingredients: </h1>
                <div className="grid grid-cols-7 mx-32">
                    <h1 className="text-base text-grey-standard col-span-5">Ingredient Name</h1>
                    <h1 className="text-base text-grey-standard col-span-1">Units</h1>
                    <h1 className="text-base text-grey-standard col-span-1">Quantity</h1>
                </div>
                <div className="grid overflow-y-scroll h-44 px-10 mx-24 py-2 gap-y-2 bg-white-standard rounded-xl ">
                    {
                        ingredients?.map((ingredient: any) => {

                            return (
                                <div className="grid grid-cols-7" key={ingredient.ingredientId}>
                                    <p className="text-base text-grey-standard col-span-5">{ingredient.ingredientName}</p>
                                    <p className="text-base text-grey-standard col-span-1">{ingredient.units}</p>
                                    <input type="number" placeholder="0" min="0"
                                        className="focus:outline-none text-right"
                                        onChange={(e) => {
                                            if (e.target.value === '0') {
                                                setIngredientQty((oldArray: any) => [...oldArray.filter((inQ: any) =>
                                                    inQ.ingredientId !== ingredient.ingredientId
                                                )])
                                            } else {
                                                setIngredientQty((oldArray: any) => [...oldArray.filter((inQ: any) =>
                                                    inQ.ingredientId !== ingredient.ingredientId
                                                ), {
                                                    ingredientId: ingredient.ingredientId,
                                                    quantity: e.target.value
                                                }])
                                            }
                                        }} />
                                </div>
                            )
                        })
                    }
                </div>


                {
                    (created ?
                        <>
                            <div className="mx-auto pb-2">Item has been added to the menu!</div>
                            <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28">
                                <button className=" text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                    onClick={() => {
                                        setCreated(false);
                                        setName("");
                                        setDesc("");
                                        setPrice("");
                                        setIngredientQty([]);
                                    }}>Reset</button>
                                <button className=" text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                    onClick={() => { setShowCreateFood(false) }}>Return</button>
                            </div>
                        </> :
                        <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28 pt-4">
                            <div className="col-span-2 text-red-standard text-center text-sm pb-2">{error}</div>
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                onClick={() => createNewFood(name, desc, price, ingredientQty)} disabled={loading}>
                                <span>
                                    {
                                        loading ?
                                            <div className="spinner" id="spinner" />
                                            : 'Confirm'
                                    }
                                </span>
                            </button>
                            <button className="border border-green-standard text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg" onClick={() => setShowCreateFood(false)}>Cancel</button>
                        </div>)
                }
            </div>

        </ReactModal>
    )
}

export default CreateFoodModal
