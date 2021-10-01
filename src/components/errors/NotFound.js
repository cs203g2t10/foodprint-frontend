import React from 'react'

const NotFound = () => {
    return (
        <div className="h-screen">
            <div>
                    <img className = "flex mx-auto"style = {{height:520}}src="/images/error.webp" alt="404" />
                    <h1 className="text-8xl text-center mb-3 text-grey-standard">oops!</h1>
                    <h1 className="text-2xl text-center text-grey-standard">looks like the page is not found</h1>
            </div>
        </div>
    )
}

export default NotFound
