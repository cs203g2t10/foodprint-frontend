import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { AiOutlineClose } from 'react-icons/ai';
import ReactModal from 'react-modal';
import { BeatLoader } from 'react-spinners';
import RestaurantService from '../services/RestaurantService';

const ChangeRestaurantPicModal = (props: any) => {
    const { changePic, setChangePic, imageUrl } = props;
    const [changed, setChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [newUrl, setNewUrl] = useState("");

    const [name, setName] = useState("");
    const [restaurantId, setRestaurantId] = useState(0);

    useEffect(() => {
        setName(props.name);
        setRestaurantId(props.restaurantId);
    }, [props])

    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const onDrop = useCallback((acceptedFiles: any) => {
        setLoading(true);
        setError("")
        if (acceptedFiles == null) {
            alert("No file selected");
            return;
        }
        var file = acceptedFiles[0];
        console.log(file);

        console.log("Uploading");
        const response = imageUrl === "/images/shop.jpg" ?
            RestaurantService.uploadRestaurantPicture(restaurantId, name, name, file) :
            RestaurantService.changeRestaurantPicture(restaurantId, file);
        response.then((response) => {
            console.log("Success: ", response.data.reservationId)
            setLoading(false);
            setChanged(true);
            setNewUrl(response.data.url);
        }).catch((error) => {
            console.log(error.response.data);
            setLoading(false);
            setError(error.response.data.message);
        });
    }, [restaurantId, imageUrl, name]);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <ReactModal style={customStyles} isOpen={changePic} className="mt-10 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 rounded-lg shadow py-6 bg-white-standard mx-auto px-20 relative w-2/5 ">
                <button className="absolute top-5 right-5 rounded-full hover:bg-grey-lightest shadow-sm p-2 bg-gray-200" onClick={() => setChangePic(false)}> <AiOutlineClose className="h-4 w-4" /> </button>
                <img className="h-52 mx-auto" src="/images/edit.png" alt="create" />
                <h1 className="flex text-3xl text-green-standard font-bold">Edit {name} Display Picture</h1>
                <h1 className=" flex text-base text-grey-standard font-light">Choose a new photo for your Restaurant!</h1>
                <div className=" pt-2 gap-x-16">
                    {
                        changed ?
                            <div>
                                <h1 className="text-center pb-1 text-base">Updated Photo</h1>
                                <img src={newUrl} alt={props?.description} className=" mb-2 h-48 w-full px-2 rounded-xxl flex mx-auto object-cover" />
                            </div> :
                            <div {...getRootProps()}>
                                <div className="grid mx-auto max-auto w-full bg-grey-lightest rounded-xxl text-center p-4 border-dashed border-2 border-grey-light hover:shadow-md shadow-sm focus:outline-none">
                                    <div>
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive ?
                                                <>
                                                    <h1 className="text-light text-base text-grey-dark">Drop your new image here.</h1>
                                                    <img src="/images/cloud.png" alt="cloud illustration" className="transform scale-75 grid justify-items-center mx-auto" />
                                                    <h1 className="text-lightest text-sm pb-2">&nbsp;</h1>
                                                    <h1 className="text-light">&nbsp;</h1>
                                                </>
                                                :
                                                <>
                                                    <h1 className="text-light text-base text-grey-dark">Drag and drop the new image here</h1>
                                                    <img src="/images/cloud.png" alt="cloud illustration" className="transform scale-75 grid justify-items-center mx-auto" />
                                                    <h1 className="text-lightest text-sm pb-2">OR</h1>
                                                    <h1 className="text-light border border-green-standard text-green-standard text-sm opacity-80 hover:opacity-90 shadow-sm hover:shadow-md w-52 mx-auto my-auto rounded-lg py-1 px-5">Click to browse for a file</h1>
                                                </>
                                        }
                                    </div>
                                </div>
                            </div>
                    }
                </div>

                {
                    changed && <div className="mx-auto text-green-standard">Picture has been successfully changed! Refresh to view changes</div>
                }
                <div className="text-red-standard text-center">{error}</div>
                <button className="text-white-standard bg-green-standard px-3 py-1 rounded-lg shadow-md hover:shadow-lg w-52 mx-auto"
                    onClick={() => setChangePic(false)}
                >
                    <span>
                        {
                            loading ?
                                <BeatLoader size="9" color="#daeddb" /> :
                                'Go Back'
                        }
                    </span>
                </button>

            </div>
        </ReactModal>
    )
}

export default ChangeRestaurantPicModal
