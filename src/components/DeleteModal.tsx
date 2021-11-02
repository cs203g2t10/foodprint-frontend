import React from 'react'
import ReactModal from 'react-modal'

const DeleteModal = (props: any) => {

    const { deleteModal, setDeleteModal, deleteUser } = props;

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    return (
        <ReactModal style={customStyles} isOpen={deleteModal} className="mt-10 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl pt-12 text-green-standard font-bold mx-auto">Delete User</h1>
                <h1 className=" flex text-md mb-2 text-grey-standard font-light mx-auto">Are you sure you want to delete the following user:</h1>
                <div className="grid grid-cols-2 justify-center items-center text-center">
                    <h1 className="text-md mb-2 text-grey-standard font-light">User ID: {props.userId}</h1>
                    <h1 className="text-md mb-2 text-grey-standard font-light">Email: {props.email}</h1>
                </div>
                <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28 pt-4">
                    <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                        onClick={() => deleteUser(props.userId)}>Confirm</button>
                    <button className="text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg" onClick={() => setDeleteModal(false)}>Cancel</button>
                </div>
            </div>

        </ReactModal>
    )
}

export default DeleteModal
