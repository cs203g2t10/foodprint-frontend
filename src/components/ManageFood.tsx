import React, { useEffect, useState } from 'react'

const ManageFood = (props: any) => {

    const [name, setName] = useState(props.name);
    const [desc, setDesc] = useState(props.desc);
    const [price, setPrice] = useState(props.price);
    const [ingredientQty, setIngredientQty] = useState(props.ingredientQty);
    const [newIngredientQty, setNewIngredientQty] = useState(props.ingredientQty);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        ingredientQty.sort();
    }, [ingredientQty])

    const editFood = (name:any, desc:any, price:any, ingredientQty:any) => {

    }

    return (
        edit ?
            <div className="grid py-4 px-10 rounded-xl bg-white-standard shadow gap-y-2">
                <img src={props.pic?.url} alt={props.pic?.description} className="rounded-full mb-5 h-48 w-48 flex mx-auto" />
                <div className="flex gap-x-3 justify-between">
                    <h1>Name: </h1>
                    <input value={name} className="px-2 focus:outline-none border rounded"
                        onChange={(e) => { setName(e.target.value) }} />
                </div>

                <div className="flex gap-x-3 justify-between">
                    <h1>Description: </h1>
                    <input value={desc} className="px-2 focus:outline-none border rounded"
                        onChange={(e) => { setDesc(e.target.value) }} />
                </div>

                <div className="flex gap-x-3 justify-between">
                    <h1>Price:$ </h1>
                    <input value={price} className="px-2 focus:outline-none border rounded"
                        onChange={(e) => { setPrice(e.target.value) }} />
                </div>

                <h1 className="text-center">Ingredient List</h1>
                {
                    newIngredientQty?.map((ingredientQ: any, idx: number) => {
                        var ingredient = ingredientQ.ingredient;
                        return (
                            <div key={idx} className="flex gap-x-2 justify-between mx-5">
                                <p>{ingredientQ.ingredient.ingredientName} ({ingredientQ.ingredient.units})</p>
                                <input value={ingredientQ.quantity} className="px-2 focus:outline-none border rounded w-12" type="number" min="0" 
                                    onChange={(e) => {
                                        if (e.target.value === '0') {
                                            setNewIngredientQty((oldArray: any) => {
                                                return [...oldArray.filter((inQ: any) => inQ.ingredient.ingredientId !== ingredient.ingredientId)]
                                            })
                                        } else {
                                            setNewIngredientQty((oldArray: any[]) => {
                                                const newQuantity = e.target.value;
                                                for (var ingredientQuantity of oldArray) {
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
                <div className="grid grid-cols-2 gap-x-10 mx-5 mt-4">
                    <button className="rounded-xxl bg-green-standard text-white-standard py-1" onClick={() => { editFood(name, desc, price, ingredientQty) }}>Confirm</button>
                    <button className="rounded-xxl bg-yellow-standard border-grey-lighter py-1" onClick={() => { 
                        setName(props.name);
                        setDesc(props.desc);
                        setPrice(props.price);
                        setIngredientQty(props.ingredientQty)
                        setEdit(false);
                    }}>Undo</button>
                </div>
            </div>
            :
            <div className="py-4 px-10 rounded-xl bg-white-standard shadow">
                <img src={props.pic?.url} alt={props.pic?.description} className="rounded-full mb-5 h-48 w-48 flex mx-auto" />
                <h1>Name: {name}</h1>
                <h1>Description: {desc}</h1>
                <h1>Price: ${price}</h1>
                <h1 className="text-center">Ingredient List</h1>
                {
                    ingredientQty?.map((ingredientQ: any, idx: number) =>
                        <div key={idx} className="flex gap-x-2 justify-between mx-5">
                            <p>{ingredientQ.ingredient.ingredientName} ({ingredientQ.ingredient.units})</p>
                            <p>Qty: {ingredientQ.quantity}</p>
                        </div>
                    )
                }
                <button className="flex rounded-xxl bg-green-standard text-white-standard py-1 mx-auto px-10 mt-4" onClick={() => { setEdit(true) }}>Edit</button>
            </div>
    )
}

export default ManageFood
