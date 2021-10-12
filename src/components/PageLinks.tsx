import React from 'react'

const PageLinks = (props:any) => {
    const {numPages, currPage, setCurrPage} = props;

    return (
        <div className="flex justify-center gap-x-3 mt-4">
            Page: 
            {
                [...Array(numPages)].map((x, i) => 
                    <button key={i} className="hover:text-blue-600"
                    onClick={()=>{
                        if (i !== currPage) {
                            setCurrPage(i);
                        }
                    }}>{i+1}</button>
                )
            }
        </div>
    )
}

export default PageLinks
