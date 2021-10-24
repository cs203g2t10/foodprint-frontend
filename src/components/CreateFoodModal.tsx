import React, { useState } from 'react'
import ReactModal from 'react-modal'
import RestaurantService from '../services/RestaurantService';

const CreateFoodModal = (props: any) => {

    const { showCreateFood, setShowCreateFood, ingredients } = props;
    const [created, setCreated] = useState(false);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState<any>();
    const [ingredientQty, setIngredientQty] = useState<any>([]);
    const [restaurantId] = useState(props.restaurantId);

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const createNewFood = (name: any, desc: any, price: any, ingredientQty: any) => {
        const response = RestaurantService.createFood(restaurantId, name, desc, price, ingredientQty);
        console.log(response);
        setCreated(true);
    }

    return (
        <ReactModal style={customStyles} isOpen={showCreateFood} className="mt-10 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl pt-12 text-green-standard font-bold mx-auto">Add Food</h1>
                <h1 className=" flex text-md mb-2 text-grey-standard font-light mx-auto">Please fill up all details below </h1>
                <div className="grid gap-y-5 grid-cols-2 gap-x-10">
                    <div className="flex gap-x-2 justify-between">
                        <div>Name: </div>
                        <input className="focus:outline-none px-2 rounded" value={name} onChange={(e) => { setName(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Description: </div>
                        <input className="focus:outline-none px-2 rounded" value={desc} onChange={(e) => { setDesc(e.target.value) }}></input>
                    </div>
                    <div className="flex gap-x-2 justify-between">
                        <div>Price(SGD):</div>
                        <input type="number" className="focus:outline-none px-2 rounded" value={price} onChange={(e) => { setPrice(e.target.value) }}></input>
                    </div>
                </div>

                <h1 className="flex text-md my-2 font-light mx-auto">Ingredients: </h1>
                <div className="grid overflow-y-scroll h-40 px-10 py-2 gap-y-2 bg-white-standard rounded-xl ">
                    <div className="flex justify-between">
                        <h1>Ingredient Name</h1>
                        <h1>Quantity</h1>
                    </div>
                    {
                        ingredients?.map((ingredient: any) => {

                            return (
                                <div className="flex justify-between" key={ingredient.ingredientId}>
                                    <p>{ingredient.ingredientName} ({ingredient.units})</p>
                                    <input type="number" placeholder="0" min="0"
                                    className="focus:outline-none text-right"
                                    onChange={(e)=>{
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
                                    }}/>
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
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                onClick={() => createNewFood(name, desc, price, ingredientQty)}>Confirm</button>
                            <button className="text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg" onClick={() => setShowCreateFood(false)}>Cancel</button>
                        </div>)
                }
            </div>

        </ReactModal>
    )
}

export default CreateFoodModal
