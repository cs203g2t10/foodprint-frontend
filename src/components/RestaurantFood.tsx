import { ChangeEvent } from "react";

const RestaurantFood = ({ food, setLineItems }: { food: any, setLineItems: any }) => {

    let foodUrl = food.picture ? food.picture.url : "/images/forkspoon.jpg"

    return <div className="relative bg-white-dirtyWhite md:h-80 md:w-64 shadow-md rounded-xl md:flex-none md:p-5 p-2" key={food.foodId}>
        <div className="flex-col mx-auto h-max ">
            <img src={foodUrl} className="mx-auto w-20 h-20 md:w-32 md:h-32 shadow-md rounded-full object-cover" alt="food pic" />
            <h1 className="text-sm sm:text-lg flex justify-center font-semibold tracking-wider text-green-standard mt-2 mb-1 text-center">{food.foodName}</h1>
            <div className="ml-2">
            </div>
            <p className="text-grey-standard md:text-sm text-xs text-center overflow-y-auto md:h-20 h-16 pb-2">{food.foodDesc}</p>

            <div className="justify-center grid md:grid-cols-5 gap-4 md:absolute bottom-0 md:mb-5 mb-2">
                <p className="md:col-start-1 md:col-end-2 md:flex md:text-xl text-sm font-bold text-green-standard text-center mx-2">${food.foodPrice}</p>
                <div className="md:col-start-3 md:col-end-5 flex">
                    <p> Qty: </p>
                    <input onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value === '0') {
                            setLineItems((oldArray: any[]) => [...oldArray.filter((lineItem: any) =>
                                lineItem.food.foodId !== food.foodId
                            )])
                        } else {
                            setLineItems((oldArray: any[]) => [...oldArray.filter((lineItem: any) =>
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