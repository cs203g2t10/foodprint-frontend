import { useState } from 'react'
import ReactModal from 'react-modal'
import { BeatLoader } from 'react-spinners';
import RestaurantService from '../services/RestaurantService';
import { AiOutlineClose } from 'react-icons/ai';

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
        <ReactModal style={customStyles} isOpen={showCreateFood} className="mt-4 focus:outline-none ">
            <div className="grid justify-center items-center gap-y-2 m-8 rounded-lg shadow py-4 bg-white-standard mx-auto px-6 relative w-2/5">
                <button className="absolute top-5 right-5 rounded-full hover:bg-grey-lightest shadow-sm p-2 bg-gray-200" onClick={() => { setShowCreateFood(false) }}> <AiOutlineClose className="h-4 w-4" /> </button>
                <img className="h-40 mx-auto" src="/images/createPic2.png" alt="create" />
                <div className="grid grid-cols-2 px-6 mb-3 justify-between">
                    <h1 className="flex text-3xl text-green-standard font-bold">Create Food</h1>
                    <h1 className="flex mb-2 text-grey-standard font-light text-sm my-auto ml-auto">*All fields are compulsory.</h1>
                </div>
                <div className="grid gap-y-3 grid-cols-5 gap-x-4 mx-6">
                    <div className="flex gap-x-2 col-span-3 justify-between">
                        <div>Food Name: </div>
                        <input className="px-2 focus:outline-none rounded-large shadow-sm h-9 border border-grey-lightest w-44" value={name} 
                        onChange={(e) => { setName(e.target.value) }} disabled={created}/>
                    </div>
                    <div className="flex gap-x-2 justify-between col-span-2 ">
                        <div>Price:</div>
                        <input type="number" className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest w-full" 
                        value={price} onChange={(e) => { setPrice(e.target.value) }} disabled={created}/>
                    </div>
                    <div className="flex gap-x-2 justify-between col-span-5">
                        <div>Description: </div>
                        <input className="focus:outline-none px-4 rounded-large shadow-sm h-9 border border-grey-lightest w-full" value={desc} 
                        onChange={(e) => { setDesc(e.target.value) }} disabled={created}/>
                    </div>
                </div>

                <div className="grid grid-cols-6 mx-10 mt-2">
                    <h1 className="text-sm text-grey-dark col-span-3">Ingredient Name</h1>
                    <h1 className="text-sm text-grey-dark col-span-2">Units</h1>
                    <h1 className="text-sm text-grey-dark col-span-1">Quantity</h1>
                </div>
                <div className="grid overflow-y-scroll h-40 px-6 mx-4 py-2 gap-y-2 bg-white-dirtyWhite rounded-lg ">
                    {
                        ingredients?.map((ingredient: any) => {

                            return (
                                <div className="grid grid-cols-6 gap-x-4 mx-4" key={ingredient.ingredientId}>
                                    <p className="text-base text-grey-standard col-span-3">{ingredient.ingredientName}</p>
                                    <p className="text-base text-grey-standard col-span-2">{ingredient.units}</p>
                                    <input type="number" placeholder="0" min="0"
                                        className="focus:outline-none text-right px-4 rounded-lg col-span-1 w-20 h-8"
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
                            <div className="text-green-standard  mx-6 text-basre pb-2 mt-1">Item has been added to the menu!</div>
                            <div className=" grid grid-cols-2 gap-x-10 justify-center mx-8 pb-3">
                                <button className=" text-white-standard bg-green-standard px-3 pt-1 rounded-lg shadow-md hover:shadow-lg"
                                    onClick={() => {
                                        setCreated(false);
                                        setName("");
                                        setDesc("");
                                        setPrice("");
                                        setIngredientQty([]);
                                    }}>Reset</button>
                                <button className=" text-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg border border-green-standard"
                                    onClick={() => { setShowCreateFood(false) }}>Return</button>
                            </div>
                        </> :
                        <div className=" grid grid-cols-2 gap-x-10 justify-center mx-6 pt-1 pb-3">
                            <div className="col-span-2 text-red-standard text-sm pb-2">{error}</div>
                            <button className="text-white-standard bg-green-standard px-3 rounded-lg shadow-md hover:shadow-lg"
                                onClick={() => createNewFood(name, desc, price, ingredientQty)} disabled={loading}>
                                <span>
                                    {
                                        loading ?
                                            <BeatLoader size="9" color="#daeddb" />
                                            : 'Confirm'
                                    }
                                </span>
                            </button>
                            <button className="border border-green-standard text-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg" onClick={() => setShowCreateFood(false)}>Cancel</button>
                        </div>)
                }
            </div>

        </ReactModal>
    )
}

export default CreateFoodModal
