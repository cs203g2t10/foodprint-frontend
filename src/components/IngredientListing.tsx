import { useState } from 'react'
import { AiFillEdit, AiOutlineCheck, AiOutlineUndo } from 'react-icons/ai';
import RestaurantService from '../services/RestaurantService';
import { AiOutlineClose } from 'react-icons/ai';
import DeleteIngredientModal from './DeleteIngredientModal';

const IngredientListing = (props: any) => {

    const [edit, setEdit] = useState(false);
    const [restaurantId] = useState(props.restaurantId);
    const [id, setId] = useState(props.id);
    const [name, setName] = useState(props.name);
    const [desc, setDesc] = useState(props.desc);
    const [units, setUnits] = useState(props.units);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [deleteModalOpen, setDeleteModal] = useState(false);

    const updateIngredientDetails: any = (id: number, name: string, desc: string, units: string) => {
        setLoading(true);
        const response = RestaurantService.updateIngredient(restaurantId, id, name, desc, units);
        response.then(res => {
            setLoading(false);
            setEdit(false);
        }).catch(err => {
            setLoading(false);
            console.log(err.response);
            if ( typeof(err.response.data.message) ===  "string") {
                setError(err.response.data.message);
            } else {
                setError(err.response.data.message[0]);
            }
        })
    }

    return (
        <div className="mx-8 grid grid-cols-10 gap-x-6">
            {error.length !== 0 &&
                <div className="col-span-10 text-red-standard text-center pb-1">{error}</div>}
            <button className="px-2 rounded-full w-8 h-8 bg-opacity-80 hover:bg-opacity-100 bg-red-standard text-white-standard text-center" onClick={() => { setDeleteModal(true) }}><AiOutlineClose /></button>
            {(edit ? <>
                <input className=" border pl-2 rounded col-span-3 focus:outline-none" onChange={(e) => { setName(e.target.value) }} value={name} />
                <input className=" border pl-2 rounded col-span-3 focus:outline-none" onChange={(e) => { setDesc(e.target.value) }} value={desc} />
                <input className=" border pl-2 rounded col-span-2 focus:outline-none" onChange={(e) => { setUnits(e.target.value) }} value={units} />
                <div className="col-span-1">
                    <button className="shadow-sm hover:shadow-md px-2 rounded-full w-8 h-8 bg-opacity-60 hover:bg-opacity-100 bg-green-standard text-white-standard text-center"
                        onClick={() => { updateIngredientDetails(id, name, desc, units) }}>
                        {loading ? <div className="spinner"></div>
                            : <AiOutlineCheck />}
                    </button>
                    <button className="mx-2 shadow-sm px-2 bg-yellow-standard hover:shadow text-center rounded-full w-8 h-8"
                        onClick={() => {
                            setError("");
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
            <DeleteIngredientModal {...{ deleteModalOpen, setDeleteModal, name, id }}
                restaurantId={restaurantId}
            />
        </div>
    )
}

export default IngredientListing
