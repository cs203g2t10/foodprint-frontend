import React, { useCallback, useState } from 'react'
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import VaccinationService from '../services/VaccinationService';
import { useDropzone } from 'react-dropzone';

const VaccinationCheck = () => {

    const [modalIsOpened, setModalIsOpened] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const onDrop = useCallback((acceptedFiles: any) => {
        if (acceptedFiles == null) {
            alert("No file selected");
            return;
        }
        var file = acceptedFiles[0];
        console.log(file);

        console.log("Uploading");
        const response = VaccinationService.userUploadVaccination(file);
        response.then((response) => {
            console.log("Success: ", response.data.reservationId)
            setModalMessage(`Thank you! We have successfully verfied ${response.data.reason}`);
            setModalIsOpened(true);
        }).catch((error) => {
            console.log(error.response.data);
            if (error.response.status === 500) {
                console.log('Error:', error.response.data.reason)
                setModalMessage(`Error while validating certificate - ${error.response.data.reason}`)
                setModalIsOpened(true)
            };
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    Modal.setAppElement("#root");

    return (
        <div className="min-h-screen">
            <h1 className="flex shadow-sm items-center justify-center text-4xl font-bold tracking-wide text-green-standard bg-yellow-standard p-6">Vaccination Check</h1>

            <div className="mx-auto mt-14 lg:w-3/6 shadow-md rounded-xxl h-auto bg-white-offWhite">
                <div className="grid grid-cols-2 p-8 pr-14">
                    <img src="/images/upload.png" alt="Upload illustration" className="transform scale-95 pt-8" />
                    <div>
                        <h1 className="text-grey-standard text-5xl font-bold">Upload File.</h1>
                        <h1 className="text-grey-lighter text-sm pb-4">Dining in is only available for vaccinated individuals. Please upload your certification to help us with this process.</h1>
                        <div {...getRootProps()}>
                            <div className="bg-grey-lightest place-items-stretch rounded-xxl text-center p-6 border-dashed border-2 border-grey-light hover:shadow-md shadow-sm">
                                <div>
                                    <input {...getInputProps()} />
                                    {
                                        isDragActive ?
                                            <>
                                                <h1 className="text-light">Drop your certificate (.oa) here.</h1>
                                                <img src="/images/cloud.png" alt="cloud illustration" className="transform scale-75 grid justify-items-center mx-auto" />
                                                <h1 className="text-lightest text-sm pb-2">&nbsp;</h1>
                                                <h1 className="text-light">&nbsp;</h1>
                                            </>
                                            :
                                            <>
                                                <h1 className="text-light text-base text-grey-dark">Drag and drop your certificate here</h1>
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
            </div>

            <Modal isOpen={modalIsOpened} className="mx-auto w-1/2 my-auto bg-white-offWhite mt-40 rounded-xxl">
                <button
                    type="button"
                    className="uk-button uk-button-danger uk-button-small ml-5 mt-5 bg-grey-lightest p-3 rounded-full shadow-sm hover:shadow-md"
                    onClick={() => setModalIsOpened(false)}>
                    <AiOutlineClose/>
                </button>
                <div className="grid grid-cols-2 gap-x-6 mx-8 h-auto py-8">
                    <div>
                        <img src="/images/confirm.png" />
                    </div>
                    <div>
                        <h1 className="text-green-standard text-5xl font-bold">You're <br/>Vaccinated.</h1>
                        <h1 className="text-base text-grey-standard text-light mt-4 mb-8">{modalMessage}</h1>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default VaccinationCheck