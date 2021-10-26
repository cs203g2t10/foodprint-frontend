import React, { useState } from 'react'
import ReactModal from 'react-modal'

const ChangeFoodPicModal = (props: any) => {

    const { changePic, setChangePic, name } = props;
    const [changed, setChanged] = useState(false);

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    return (
        <ReactModal style={customStyles} isOpen={changePic} className="mt-10 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl pt-12 text-green-standard font-bold mx-auto">Change {name} Photo</h1>
                <h1 className=" flex text-md mb-2 text-grey-standard font-light mx-auto">Please drag and drop your file below.</h1>
                <div className="grid grid-cols-2 justify-between pt-5 gap-x-20">
                    <div>
                        <h1 className="text-center pb-5">Original Photo</h1>
                        <img src={props?.url} alt={props?.description} className="rounded-full mb-5 h-48 w-48 flex mx-auto" />
                    </div>
                    <div>
                        <h1 className="text-center pb-5">New Photo</h1>
                        <img src="/images/upload.png" alt="drag and drop" className="rounded-full mb-5 h-48 w-48 flex mx-auto" />
                    </div>
                </div>


                {
                    (changed ?
                        <>
                            <div className="mx-auto pb-2">Item has been added to the menu!</div>
                            <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28">
                                <button className=" text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                    onClick={() => {
                                        setChanged(false);
                                    }}>Reset</button>
                                <button className=" text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                                    onClick={() => { setChangePic(false) }}>Return</button>
                            </div>
                        </> :
                        <div className=" grid grid-cols-2 gap-x-10 justify-center mx-28 pt-4">
                            <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg"
                            >Confirm</button>
                            <button className="text-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg" onClick={() => setChangePic(false)}>Cancel</button>
                        </div>)
                }
            </div>
        </ReactModal>
    )
}

export default ChangeFoodPicModal
