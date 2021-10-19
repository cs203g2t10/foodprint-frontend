import { useState } from 'react'
import { AiFillEdit, AiOutlineCheck, AiOutlineUndo } from 'react-icons/ai';
import RestaurantService from '../services/RestaurantService';

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
        <div className="mx-10 grid grid-cols-12 gap-x-6">
            <button className="px-2 rounded-lg bg-red-standard text-white-standard text-center" onClick={() => { deleteIngredient(props.id) }}>X</button>
            {/* <div>{props.id}</div> */}
            {(edit ? <>
                <input className=" border pl-2 rounded col-span-3 focus:outline-none" onChange={(e) => { setName(e.target.value) }} value={name} />
                <input className=" border pl-2 rounded col-span-3 focus:outline-none" onChange={(e) => { setDesc(e.target.value) }} value={desc} />
                <input className=" border pl-2 rounded col-span-2 focus:outline-none" onChange={(e) => { setUnits(e.target.value) }} value={units} />
                <button className=" border px-2 rounded bg-green-standard text-white-standard hover:shadow text-center"
                    onClick={() => {
                        updateIngredientDetails(id, name, desc, units)
                        setEdit(false);
                    }}><AiOutlineCheck /></button>
                <button className=" border px-2 rounded bg-yellow-standard hover:shadow text-center"
                    onClick={() => {
                        setId(props.id);
                        setName(props.name);
                        setDesc(props.desc);
                        setUnits(props.units)
                        setEdit(false)
                    }}
                ><AiOutlineUndo /></button>
            </>
                : <>
                    <p className="col-span-3">{name}</p>
                    <p className="col-span-3"> {desc}</p>
                    <p className="col-span-2">{units}</p>
                    <button className="border px-2 rounded-lg bg-green-standard text-white-standard text-center hover:shadow"
                        onClick={() => setEdit(true)}><AiFillEdit /></button>
                </>)}

        </div>
    )
}

export default IngredientListing
