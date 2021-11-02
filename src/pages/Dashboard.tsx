import React from 'react'

const Dashboard = () => {
    return (
        <div className="min-h-screen">
            <div className="bg-yellow-standard">
                <h1 className="text-5xl text-center font-bold text-green-standard tracking-wide pb-5">Dashboard</h1>
            </div>

            <div className="grid grid-cols-2 mx-20 my-8 gap-x-10">
                <div className="bg-white-dirtyWhite rounded-xxl p-7">
                    <h1 className="text-green-standard text-xl font-semibold tracking-wide pb-5">Ingredients required</h1>
                    <div className="grid grid-cols-6">
                        <h1 className="text-grey-standard text-base col-span-4">Ingredient</h1>
                        <h1 className="text-grey-standard text-base col-span-2">Quantity</h1>
                    </div>
                    <div className="bg-white-standard rounded-large">
                        <img className="h-12 w-12 object-cover rounded-lg" src="/images/shop.jpg" alt="restaurant"/>
                        <h1></h1>
                    </div>

                </div>
                <h1>hi</h1>
            </div>

        </div>
    )
}

export default Dashboard