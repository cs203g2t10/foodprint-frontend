import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'react-modal';

const LineItemsModal = (props: any) => {

    const { viewOrder, setViewOrder } = props;

    const [lineItems, setLineItems] = useState([]);

    useEffect(() => {
        setLineItems(props.lineItems);
    }, [props])

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    return (
        <Modal style={customStyles} isOpen={viewOrder} className="flex md:mt-24 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 rounded-lg shadow py-10 bg-white-standard mx-auto px-20 relative w-1/3">
                <button className="absolute top-5 right-5 rounded-full hover:bg-grey-lightest shadow-sm p-2 bg-gray-200" onClick={() => setViewOrder(false)}> <AiOutlineClose className="h-5 w-5" /> </button>
                <img className="px-5" src="/images/create.png" alt="create" />
                <h1 className="flex text-3xl text-green-standard font-bold mt-3">Reservation {props.reservationId} </h1>
                <h1 className="flex text-lg text-grey-standard font-light">Line Items: </h1>
                <div className="grid grid-cols-2 justify-between gap-y-2">
                    <div className="">Food</div>
                    <div className="text-right">Quantity</div>
                    {
                        lineItems?.map((lineItem: any) => {
                            console.log(lineItem);
                            return (<>
                                <div className="text-gray-600">{lineItem.foodName}</div>
                                <div className="text-gray-600 text-right">x {lineItem.quantity}</div>
                            </>)
                        })
                    }
                </div>

            </div>

        </Modal>
    )
}

export default LineItemsModal
