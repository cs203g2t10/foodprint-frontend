import React from 'react'

const PageLinks = (props: any) => {
    const { numPages, currPage, setCurrPage } = props;

    return (
        <div className="flex justify-center gap-x-3 mt-4">
            Page:
            {
                [...Array(numPages)].map((x, i) => {
                    if (i !== currPage) {
                        return <button key={i} className="hover:text-blue-600 text-gray-400" onClick={() => setCurrPage(i)}>{i + 1}</button>
                    } else {
                        return <button key={i} className="text-black"
                        >{i + 1}</button>
                    }
                }
                )
            }
        </div>
    )
}

export default PageLinks
