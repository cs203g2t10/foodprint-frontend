const RestaurantFood = ({food, setLineItems}) => {
    
    let foodUrl = "/images/sushi.jpg"
    
    if (food.pictures.length > 0)
        foodUrl = food.pictures[0].url;

    return <div className="bg-white-dirtyWhite h-auto w-48 shadow-md hover:shadow-lg rounded-xl flex-none p-5" key={food.foodId}>
        {/* <img src="/images/{food.picturePath}" className="mx-auto w-32 h-32 shadow-md rounded-full" alt="food pic" /> */}
        <img src={foodUrl} className="mx-auto w-32 h-32 shadow-md rounded-full" alt="food pic" />
        <div className="flex-col mx-auto">
            <h1 className="flex justify-center text-xl mt-2">{food.foodName}</h1>
            <p className="text-grey-standard">{food.foodDesc}</p>
            <p className="flex justify-center text-3xl font-bold text-green-standard">${food.foodPrice}</p>

            <div className="flex justify-center py-2">
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
                    className="focus:outline-none px-3 rounded mx-3" placeholder="0" type="number" min="0" max="20" />
            </div>
        </div>
        <div className="flex">
        </div>
    </div>
}

export default RestaurantFood