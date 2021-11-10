import { useState } from 'react'
import ReactModal from 'react-modal'
import AdminService from '../services/AdminService';

const DeleteUserModal = (props: any) => {

    const { deleteModal, setDeleteModal } = props;
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const deleteUser: any = (id: number) => {
        setLoading(true);
        console.log(id)
        const response = AdminService.deleteUser(id);
        response.then(res => {
            console.log(res);
            setLoading(false);
            setDeleted(true);
        })
        .catch(err => {
            console.log(err.response);
            setError(err.response.data.message);
            setLoading(false);
        })
    }

    return (
        <ReactModal style={customStyles} isOpen={deleteModal} className="mt-10 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 m-24 rounded-xxl shadow lg:mx-96 pb-10 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl pt-12 text-green-standard font-bold mx-auto">Delete User</h1>
                <h1 className=" flex text-md mb-2 text-grey-standard font-light mx-auto">Are you sure you want to delete the following user:</h1>
                <div className="justify-center items-center text-center">
                    <h1 className="text-md text-grey-standard font-light">User ID: {props.userId}</h1>
                    <h1 className="text-md mb-2 text-grey-standard font-light">Email: {props.email}</h1>
                </div>
                {
                    deleted ?
                        <>
                            <div className="text-center text-green-standard">User with ID {props.userId} has been deleted!</div>
                            <button className="text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg w-1/3 mx-auto" onClick={() => setDeleteModal(false)}>Return</button>
                        </> :
                        <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28 pt-4">
                            <div className="col-span-2 text-red-standard text-center pb-2">{error}</div>
                            <button className="text-white-standard bg-green-standard px-4 py-1 rounded-full  shadow-md hover:shadow-lg"
                                onClick={() => deleteUser(props.userId)}>
                                {
                                    loading ? <div className="spinner" id="spinner" />
                                        : 'Confirm'
                                }
                            </button>
                            <button className="text-green-standard border border-green-standard px-4 py-1 rounded-full shadow-md hover:shadow-lg" onClick={() => setDeleteModal(false)}>Cancel</button>
                        </div>
                }
                {/* <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28 pt-4">
                    <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                        onClick={() => deleteUser(props.userId)}>Confirm</button>
                    <button className="text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg" onClick={() => setDeleteModal(false)}>Cancel</button>
                </div> */}
            </div>

        </ReactModal>
    )
}

export default DeleteUserModal
