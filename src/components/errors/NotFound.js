import React from 'react'

const NotFound = () => {
    return (
        <div className="min-h-screen">
            <div className="grid grid-col-2">
                <div>
                    <img className = "my-0 flex mx-auto"style = {{height:490}}src="/images/error.webp" alt="404" />
                </div>
                <div>
                    <h1 className="text-8xl text-center mb-3 text-grey-standard">oops!</h1>
                    <h1 className="text-2xl text-center text-grey-standard">looks like the page is not found</h1>
                </div>
            </div>
        </div>
    )
}

export default NotFound
