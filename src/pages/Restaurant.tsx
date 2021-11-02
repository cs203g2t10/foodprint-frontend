import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import RestaurantService from '../services/RestaurantService'
import ReservationModal from '../components/ReservationModal'

import "react-datepicker/dist/react-datepicker.css";
import RestaurantFood from '../components/RestaurantFood';

const Restaurant = () => {

    let id = useParams<any>();

    const [restaurantDetails, setRestaurantDetails] = useState<any>([]);
    const [food, setFood] = useState<any>([]);
    const [lineItems, setLineItems] = useState([]);
    const [modalIsOpen, setModal] = useState(false);
    const [imageUrl, setImageUrl] = useState("/images/shop.jpg")

    const [finalPrice, setFinalPrice] = useState(0);
    const [haveFood, setHaveFood] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        RestaurantService.getRestaurant(id.id).then((response) => {
            setRestaurantDetails(response.data)
            if (response.data.picture) {
                setImageUrl(response.data.picture.url);
            }
        })
    }, [id])

    useEffect(() => {
        RestaurantService.getAllFood(id.id).then((response) => {
            setFood(response.data)
        })
    }, [id])

    useEffect(() => {
        setTotalPrice(0);
        lineItems.map((lineItem: any) => {
            return setTotalPrice((old) => old + lineItem.food.foodPrice * lineItem.quantity)
        })
    }, [lineItems])

    useEffect(() => {
        setFinalPrice(totalPrice * 1.17)
    }, [totalPrice])

    const makeReservationButtonClick = () => {
        if (lineItems.length === 0) {
            setHaveFood(true);
        } else {
            setModal(true)
        }
    }

    return (
        <div>
            <div>
                <div className="absolute z-10">
                    <div className="grid grid-cols-9 gap-x-16 mx-4 my-10">
                        <h2 className="col-span-1">&nbsp;</h2>
                        <div className="col-span-2">
                            <img className="w-40 h-40 rounded-full" src={imageUrl} alt="shop" />
                        </div>
                        <div className="col-span-6 px-0">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-green-standard">{restaurantDetails.restaurantName}</h1>
                            <p className="text-lg md:text-2xl text-green-standard">{restaurantDetails.restaurantDesc}</p>
                            <p className="text-md md:pb-4 text-grey-standard">{restaurantDetails.restaurantLocation}</p>
                        </div>
                    </div>
                </div>
                <svg className="waves h-72 w-full transform -rotate-180 " xmlns="http://www.w3.org/2000/svg" viewBox="100 20 130 70" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="100" y="2" fill="rgba(243, 232, 201, 1)" />
                    </g>
                </svg>
            </div>

            <div className="grid items-end justify-end mr-24">
                <button className=" text-white-standard py-2 px-5 bg-green-standard rounded-xl shadow-md hover:shadow-lg" onClick={makeReservationButtonClick}>Make Reservation</button>
            </div>
            {haveFood &&
                <h1 className="text-right text-red-standard mr-24">Please select some food</h1>
            }
            
            <div className="gap-x-16  grid items-center justify-items-center xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-y-16 mx-24 mt-10 pb-8 animate__animated animate__fadeIn">
                {
                    food?.map(
                        (food: any) => <RestaurantFood {...{ food, setLineItems }} key={food.foodId} />
                    )
                }
            </div>
            <ReservationModal {...{ id, modalIsOpen, lineItems, finalPrice, totalPrice, setModal }} />
        </div>
    )
}



export default Restaurant
