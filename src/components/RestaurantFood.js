const RestaurantFood = ({ food, setLineItems }) => {

    let foodUrl = "/images/sushi.jpg"

    if (food.pictures.length > 0)
        foodUrl = food.pictures[0].url;

    return <div className="relative bg-white-dirtyWhite h-80 w-64 shadow-md rounded-xl flex-none p-5" key={food.foodId}>
        {/* <img src="/images/{food.picturePath}" className="mx-auto w-32 h-32 shadow-md rounded-full" alt="food pic" /> */}

        <div className="flex-col mx-auto h-max ">
            <img src={foodUrl} className="mx-auto w-32 h-32 shadow-md rounded-full object-cover" alt="food pic" />
            <h1 className="flex justify-center font-semibold tracking-wider text-green-standard mt-2 mb-1">{food.foodName}</h1>
            <div className="ml-2">
            </div>
            <p className="text-grey-standard text-sm text-center overflow-y-auto h-20 pb-2">{food.foodDesc}</p>

            <div className="flex justify-center grid grid-cols-5 gap-4 absolute bottom-0 mb-5">
                <p className="col-start-1 col-end-2 flex text-xl font-bold text-green-standard text-center mx-2">${food.foodPrice}</p>
                <div className="col-start-3 col-end-5 flex">
                    <p> Qty: </p>
                    <input onChange={e => {
                        if (e.target.value === '0') {
                            setLineItems(oldArray => [...oldArray.filter(lineItem =>
                                lineItem.food.foodId !== food.foodId
                            )])
                        } else {
                            setLineItems(oldArray => [...oldArray.filter(lineItem =>
                                lineItem.food.foodId !== food.foodId
                            ), {
                                food,
                                quantity: e.target.value
                            }])
                        }
                    }
                    }
                        className="focus:outline-none px-3 rounded-full mx-3 shadow-sm " placeholder="0" type="number" min="0" max="20" />
                </div>
            </div>
        </div>
        <div className="flex">
        </div>
    </div>
}

export default RestaurantFood