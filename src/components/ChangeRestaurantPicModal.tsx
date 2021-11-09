import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import ReactModal from 'react-modal';
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
        // const response = RestaurantService.changeRestaurantPicture(restaurantId, file);
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
            <div className="grid justify-center items-center gap-y-2 m-10 rounded-xxl shadow lg:mx-64 pb-10 bg-white-dirtyWhite">
                <h1 className=" flex text-5xl pt-12 text-green-standard font-bold mx-auto">{name} Display Picture</h1>
                <h1 className=" flex text-md mb-2 text-grey-standard font-light mx-auto">Choose a new photo for your Restaurant!</h1>
                <div className="grid grid-cols-2 justify-between pt-5 gap-x-16">
                    {
                        changed ?
                            <div>
                                <h1 className="text-center pb-4">Updated Photo</h1>
                                <img src={newUrl} alt={props?.description} className="rounded-full mb-5 h-56 w-56 flex mx-auto object-cover" />
                            </div> :
                            <div>
                                <h1 className="text-center pb-4">Original Photo</h1>
                                <img src={imageUrl} alt={name + ' pic'} className="rounded-full mb-5 h-56 w-56 flex mx-auto object-cover" />
                            </div>
                    }
                    <div>
                        <div {...getRootProps()}>
                            <div className="bg-grey-lightest place-items-stretch rounded-xxl text-center p-10 border-dashed border-2 border-grey-light hover:shadow-md shadow-sm focus:outline-none">
                                <div>
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                            <>
                                                <h1 className="text-light">Drop your new image here.</h1>
                                                <img src="/images/cloud.png" alt="cloud illustration" className="transform scale-75 grid justify-items-center mx-auto" />
                                                <h1 className="text-lightest text-sm pb-2">&nbsp;</h1>
                                                <h1 className="text-light">&nbsp;</h1>
                                            </>
                                            :
                                            <>
                                                <h1 className="text-light text-base text-grey-dark">Drag and drop the new image here</h1>
                                                <img src="/images/cloud.png" alt="cloud illustration" className="transform scale-75 grid justify-items-center mx-auto" />
                                                <h1 className="text-lightest text-sm pb-2">OR</h1>
                                                <h1 className="text-light bg-green-standard text-white-standard text-sm opacity-70 hover:opacity-80 shadow-sm hover:shadow-md w-4/5 mx-auto py-1 rounded-full px-5">Click to browse for a file</h1>
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    changed && <div className="mx-auto text-green-standard">Picture has been successfully changed!</div>
                }
                <div className="text-red-standard text-center">{error}</div>
                <button className="text-white-standard bg-green-standard px-3 py-1 rounded-xl shadow-md hover:shadow-lg w-1/3 mx-auto"
                    onClick={() => setChangePic(false)}
                >
                    <span>
                        {
                            loading ?
                                <div className="spinner" id="spinner" /> :
                                'Go Back'
                        }
                    </span>
                </button>

            </div>
        </ReactModal>
    )
}

export default ChangeRestaurantPicModal
