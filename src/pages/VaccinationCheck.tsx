import React from 'react'

const VaccinationCheck = () => {
    return (
        <div className="min-h-screen">
            <h1 className="flex shadow-sm items-center justify-center text-4xl font-bold tracking-wide text-green-standard bg-yellow-standard p-6">Vaccination Check</h1>

            <div className="mx-auto mt-14 lg:w-3/6 shadow-md rounded-xxl h-auto bg-white-offWhite">
                <div className="grid grid-cols-2 p-8 pr-14">
                    <img src="/images/upload.png" alt="Upload illustration" className="transform scale-95 pt-8"/>
                    <div>
                        <h1 className="text-grey-lighter text-5xl font-bold">Upload File.</h1>
                        <h1 className="text-grey-lighter text-sm pb-4">Dining in is only available for vaccinated individuals. Please upload your certification to help us with this process.</h1>
                        <div>
                            <div className="bg-grey-lightest place-items-stretch rounded-xxl text-center p-6 border-dashed border-2 border-grey-light hover:shadow-md shadow-sm">
                                <h1 className="text-light">Drag and drop your files here.</h1>
                                <img src="/images/cloud.png" alt="cloud illustration" className="transform scale-75 grid justify-items-center mx-auto"/>
                                <h1 className="text-lightest text-sm pb-2">OR</h1>
                                <button className="bg-green-standard rounded-full text-white-standard px-5 py-1 shadow-sm hover:shadow-md">Browse File</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VaccinationCheck