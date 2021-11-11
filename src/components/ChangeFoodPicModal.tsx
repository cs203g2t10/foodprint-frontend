import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { AiOutlineClose } from 'react-icons/ai';
import ReactModal from 'react-modal'
import { BeatLoader } from 'react-spinners';
import RestaurantService from '../services/RestaurantService';

const ChangeFoodPicModal = (props: any) => {

    const { changePic, setChangePic, name, setEdit, setSuccess } = props;
    const [changed, setChanged] = useState(false);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");
    const [newUrl, setNewUrl] = useState("");


    const customStyles = {
        overlay: { zIndex: 1000 }
    };

    const onDrop = useCallback((acceptedFiles: any) => {
        setError("");
        setLoading(true);
        if (acceptedFiles == null) {
            alert("No file selected");
            return;
        }
        var file = acceptedFiles[0];
        console.log(file);
        console.log("Uploading");
        const response = props?.url === "/images/forkspoon.jpg" ?
            RestaurantService.uploadFoodPic(props.restaurantId, props.foodId, name, name, file) :
            RestaurantService.editFoodPic(props.restaurantId, props.foodId, file);
        response.then((response) => {
            console.log(response);
            setLoading(false);
            setChanged(true);
            setSuccess(true);
            setNewUrl(response.data.url);
        }).catch((error) => {
            console.log(error.response);
            setError(error.response.data.message);
            setLoading(false);
        })
    }, [name, props, setSuccess]);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <ReactModal style={customStyles} isOpen={changePic} className="mt-10 focus:outline-none">
            <div className="grid justify-center items-center gap-y-2 rounded-lg shadow py-6 bg-white-standard mx-auto px-16 relative w-2/5 ">
                <button className="absolute top-5 right-5 rounded-full hover:bg-grey-lightest shadow-sm p-2 bg-gray-200" onClick={() => setChangePic(false)}> <AiOutlineClose className="h-4 w-4" /> </button>
                <img className="h-48 mx-auto" src="/images/edit.png" alt="create" />
                <h1 className="flex text-3xl text-green-standard font-bold">Edit {name} Display Picture</h1>
                <div className="gridjustify-between pt-2 gap-x-16">
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
                                                <h1 className="text-light">Drop your image here.</h1>
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
                    onClick={() => { setChangePic(false); setEdit(false) }}
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

export default ChangeFoodPicModal
