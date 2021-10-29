import React, { useEffect, useState } from 'react'
import RestaurantService from '../services/RestaurantService';
import ChangeFoodPicModal from './ChangeFoodPicModal';

const ManageFood = (props: any) => {

    const [name, setName] = useState(props.name);
    const [desc, setDesc] = useState(props.desc);
    const [price, setPrice] = useState(props.price);
    const [ingredientQty, setIngredientQty] = useState(props.ingredientQty);
    const [newIngredientQty, setNewIngredientQty] = useState(props.ingredientQty);
    const [edit, setEdit] = useState(false);
    const [changePic, setChangePic] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        ingredientQty.sort();
    }, [ingredientQty])

    const editFood = (name: any, desc: any, price: any, ingredientQty: any) => {
        const response = RestaurantService.editFood(props.restaurantId, props.foodId, name, desc, price, ingredientQty);
        console.log(response);
        response.then((success) => {
            console.log(success);
            setIngredientQty(newIngredientQty);
            setEdit(false);
            setSuccess(true);
        }).catch((error) => {
            console.log(error);
        })

    }

    return (
        edit ?
            <div className="grid px-10 bg-white-dirtyWhite rounded-xl shadow py-4">
                <div className="h-32 w-32 mx-auto relative overflow-hidden rounded-full hover:shadow-md">
                    <img src={props.pic?.url} alt={props.pic?.description} className=" mb-5 flex filter opacity-40 object-cover w-full h-full"
                        onClick={() => setChangePic(true)} />
                    <h1 className="absolute w-full py-2.5 bottom-0 inset-x-0 bg-green-standard text-white-standard text-xs text-center leading-4 shadow opacity-90">Click to edit</h1>
                </div>

                <div className="flex gap-x-3 justify-between h-8">
                    <h1 className="text-green-standard">Name: </h1>
                    <input value={name} className="px-2 focus:outline-none border rounded-large"
                        onChange={(e) => { setName(e.target.value) }} />
                </div>

                <div className="flex gap-x-3 justify-between h-8">
                    <h1 className="text-green-standard">Description: </h1>
                    <input value={desc} className="px-2 focus:outline-none border rounded-large"
                        onChange={(e) => { setDesc(e.target.value) }} />
                </div>

                <div className="flex gap-x-3 justify-between h-8">
                    <h1 className="text-green-standard">Price:$ </h1>
                    <input value={price} className="px-2 focus:outline-none border rounded-large" type="number"
                        onChange={(e) => { setPrice(e.target.value) }} />
                </div>

                <h1 className="text-green-standard">Ingredient List</h1>
                <div className="overflow-y-auto h-36">
                    {
                        newIngredientQty?.map((ingredientQ: any, idx: number) => {
                            var ingredient = ingredientQ.ingredient;
                            return (
                                <div key={idx} className="flex gap-x-2 justify-between">
                                    <p>{ingredientQ.ingredient.ingredientName} ({ingredientQ.ingredient.units})</p>
                                    <input value={ingredientQ.quantity} className="px-2 focus:outline-none border rounded-large w-12" type="number" min="0"
                                        onChange={(e) => {
                                            if (e.target.value === '0') {
                                                setNewIngredientQty((oldArray: any) => {
                                                    return [...oldArray.filter((inQ: any) => inQ.ingredient.ingredientId !== ingredient.ingredientId)]
                                                })
                                            } else {
                                                setNewIngredientQty((oldArray: any[]) => {
                                                    const newQuantity = e.target.value;
                                                    for (var ingredientQuantity of oldArray) {
                                                        // ingredientQuantity.ingredient.picturesPath = []
                                                        if (ingredientQuantity.ingredient.ingredientId === ingredient.ingredientId) {
                                                            ingredientQuantity.quantity = parseInt(newQuantity);
                                                        }
                                                    }
                                                    oldArray.sort((a: any, b: any) => b.quantity - a.quantity);
                                                    return JSON.parse(JSON.stringify(oldArray));
                                                });
                                            }
                                        }} />
                                </div>
                            )
                        }

                        )
                    }

                </div>
                <div className="grid grid-cols-2 gap-x-10  mt-4">
                    <button className="rounded-full bg-green-standard text-white-standard py-1 h-8 opacity-90 hover:opacity-100 shadow-sm hover:shadow-md" onClick={() => { editFood(name, desc, price, newIngredientQty) }}>Confirm</button>
                    <button className="rounded-full border border-green-standard py-1 h-8 text-green-standard opacity-90 hover:opacity-100 shadow-sm hover:shadow-md" onClick={() => {
                        setName(props.name);
                        setDesc(props.desc);
                        setPrice(props.price);
                        setNewIngredientQty(props.ingredientQty)
                        setEdit(false);
                    }}>Undo</button>
                </div>
                <ChangeFoodPicModal className="" {...{ changePic, setChangePic, name }} url={props.pic?.url} />
            </div>
            :
            <div className="py-4 px-8 rounded-xl bg-white-dirtyWhite shadow-sm">
                <img src={props.pic?.url} alt={props.pic?.description} className="rounded-full mb-5 h-32 w-32 flex mx-auto shadow-sm" />
                <div className="grid grid-cols-2 justify-between gap-y-1">
                    <h1 className="">Name: </h1>
                    <h1 className="text-right">{name}</h1>
                    {/* <div className="col-span-2"> */}
                    <h1 >Description:</h1>
                    <h1 className="text-right">{desc}</h1>
                    {/* </div> */}
                    <h1 className="">Price:</h1>
                    <h1 className="text-right">${price}</h1>
                </div>
                <h1 className="">Ingredient List</h1>
                <div className="overflow-y-auto h-36">
                    {
                        ingredientQty?.map((ingredientQ: any, idx: number) =>
                            <div key={idx} className="flex gap-x-2 justify-between mx-5">
                                <p>{ingredientQ.ingredient.ingredientName} ({ingredientQ.ingredient.units})</p>
                                <p>Qty: {ingredientQ.quantity}</p>
                            </div>
                        )
                    }
                </div>
                {
                    (success &&
                        <div className="text-center text-green-standard">Your changes have been saved!</div>)
                }
                <button className="flex rounded-xxl bg-green-standard text-white-standard py-1 mx-auto px-10 mt-4" onClick={() => { setEdit(true) }}>Edit</button>
            </div>
    )
}

export default ManageFood
