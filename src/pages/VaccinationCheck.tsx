import React, { useCallback, useEffect, useState } from 'react'
import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import VaccinationService from '../services/VaccinationService';
import { useDropzone } from 'react-dropzone';
import LogInService, { UserDetails } from '../services/LogInService';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const VaccinationCheck = () => {

    const [isVaccinated, setVaccinated] = useState(false);
    const [modalIsOpened, setModalIsOpened] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [error, setError] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const userInfo: UserDetails = LogInService.getUserDetails();
        if (userInfo.vaccinationName !== undefined) {
            setVaccinated(true);
        }
    }, [])

    const onDrop = useCallback((acceptedFiles: any) => {
        setLoading(true);
        setInvalid(false);
        setError("");
        if (acceptedFiles == null) {
            alert("No file selected");
            return;
        }
        var file = acceptedFiles[0];
        console.log(file);

        console.log("Uploading");
        const response = VaccinationService.userUploadVaccination(file);
        response.then((response) => {
            setLoading(false);
            setInvalid(false);
            setError("")
            console.log(response);
            console.log("Success: ", response.data.reservationId)
            setModalMessage(`Thank you! We have successfully verfied ${response.data.reason}`);
            setModalIsOpened(true);
        }).catch((error) => {
            console.log(error.response.data);
            setLoading(false);
            if (error.response.status === 500) {
                setInvalid(true);
                console.log('Error:', error.response.data.reason)
                setError(`Error while validating certificate - ${error.response.data.reason}`)
                setModalIsOpened(true)
            };
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    Modal.setAppElement("#root");

    return (
        <div className="min-h-screen">
            <h1 className="flex shadow-sm items-center justify-center text-5xl font-bold tracking-wide text-green-standard bg-yellow-standard p-3">Vaccination Check</h1>

            <div className="mx-auto mt-14 lg:w-3/6 shadow-md rounded-lg h-auto bg-white-offWhite">
                <div className="grid grid-cols-2 p-8 pr-14">
                    <img src="/images/upload.png" alt="upload illustration" className="transform scale-95 pt-8" />
                    <div>
                        <h1 className="text-grey-standard text-5xl font-bold">Upload File.</h1>
                        {
                            isVaccinated ? <div>
                                <h1 className="text-grey-lighter text-sm pb-4">Your vaccination status is verified!</h1>
                                <Link to="/" className="bg-green-standard text-white-standard py-1 px-6 rounded-full">Return Home</Link>
                            </div>
                                :
                                <h1 className="text-grey-lighter text-sm pb-4">Dining in is only available for vaccinated individuals. Please upload your certification to help us with this process.</h1>
                        }
                        {
                            !isVaccinated &&
                            <div {...getRootProps()}>
                                <div className="bg-grey-lightest place-items-stretch rounded-xl text-center p-6 border-dashed border-2 border-grey-light hover:shadow-md shadow-sm focus:outline-none">
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
                                                    <h1 className="text-light bg-green-standard text-white-standard text-sm opacity-90 hover:opacity-100 shadow-sm hover:shadow-md w-4/5 mx-auto py-1 rounded-full px-5">
                                                        {
                                                            loading ? <BeatLoader size="9" color="#daeddb" /> 
                                                            : 'Click to browse for a file'
                                                        }
                                                        
                                                    </h1>
                                                </>
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>

            <Modal isOpen={modalIsOpened} className="mx-auto w-2/6  my-auto bg-white-standard mt-24 rounded-lg shadow-md">
                <button
                    type="button"
                    className="uk-button uk-button-danger uk-button-small ml-5 mt-5 bg-grey-lightest p-3 rounded-full shadow-sm hover:shadow-md"
                    onClick={() => setModalIsOpened(false)}>
                    <AiOutlineClose />
                </button>


                <div className="h-auto mx-20 pb-5">
                    <div>
                        {
                            (invalid ?
                                <div>
                                    <img src="/images/unvax.jpg" alt="vaccinated" className="transform h-64 grid mx-auto" />
                                    <h1 className="text-red-standard text-3xl font-bold mt-4">Check Unsuccessful.</h1>
                                    <h1 className="text-base text-grey-standard text-light mt-4 mb-16">{error}</h1>
                                </div>
                                : <>
                                    <img src="/images/vax.jpg" alt="vaccinated" className="transform h-52 grid mx-auto" />
                                    <h1 className="text-green-standard text-3xl font-bold mt-4">You're Vaccinated.</h1>
                                    <h1 className="text-base text-grey-standard text-light mt-4 mb-8 ">{modalMessage}</h1>
                                </>
                            )
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default VaccinationCheck