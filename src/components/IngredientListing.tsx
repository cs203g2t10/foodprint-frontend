import { useState } from 'react'
import { AiFillEdit, AiOutlineCheck, AiOutlineUndo } from 'react-icons/ai';
import RestaurantService from '../services/RestaurantService';
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';

const IngredientListing = (props: any) => {

    const {setDeleteMessage} = props;

    const [edit, setEdit] = useState(false);
    const [restaurantId] = useState(props.restaurantId);
    const [id, setId] = useState(props.id);
    const [name, setName] = useState(props.name);
    const [desc, setDesc] = useState(props.desc);
    const [units, setUnits] = useState(props.units);

    const deleteIngredient: any = async (id: number) => {
        console.log(id)
        await RestaurantService.deleteIngredient(restaurantId, id);
        setDeleteMessage("Ingredient with id: " + id + " has been deleted.")
    }

    const updateIngredientDetails: any = (id: number, name: string, desc: string, units:string) => {
        RestaurantService.updateIngredient(restaurantId, id, name, desc, units);
    }

    return (
        <div className="mx-8 grid grid-cols-10 gap-x-6">
            <button className="px-2 rounded-full w-8 h-8 bg-opacity-80 hover:bg-opacity-100 bg-red-standard text-white-standard text-center" onClick={() => { deleteIngredient(props.id) }}><AiOutlineClose/></button>
            {/* <div>{props.id}</div> */}
            {(edit ? <>
                <input className=" border pl-2 rounded col-span-3 focus:outline-none" onChange={(e) => { setName(e.target.value) }} value={name} />
                <input className=" border pl-2 rounded col-span-3 focus:outline-none" onChange={(e) => { setDesc(e.target.value) }} value={desc} />
                <input className=" border pl-2 rounded col-span-2 focus:outline-none" onChange={(e) => { setUnits(e.target.value) }} value={units} />
                <div className="col-span-1">
                    <button className="shadow-sm hover:shadow-md px-2 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                        onClick={() => {
                            updateIngredientDetails(id, name, desc, units)
                            setEdit(false);
                        }}><AiOutlineCheck /></button>
                    <button className="mx-2 shadow-sm hover:shadow-md px-2 rounded bg-yellow-standard hover:shadow text-center rounded-full w-8 h-8"
                        onClick={() => {
                            setId(props.id);
                            setName(props.name);
                            setDesc(props.desc);
                            setUnits(props.units)
                            setEdit(false)
                        }}
                    ><AiOutlineUndo /></button>
                </div>
            </>
                : <>
                    <p className="col-span-3">{name}</p>
                    <p className="col-span-3"> {desc}</p>
                    <p className="col-span-2">{units}</p>
                    <button className="shadow-sm hover:shadow-md px-2 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                        onClick={() => setEdit(true)}><AiFillEdit /></button>
                </>)}

        </div>
    )
}

export default IngredientListing
