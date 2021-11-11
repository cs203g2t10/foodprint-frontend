import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import RestaurantService from '../services/RestaurantService'
import ReservationModal from '../components/ReservationModal'

import "react-datepicker/dist/react-datepicker.css";
import RestaurantFood from '../components/RestaurantFood';
import Loading from '../components/Loading';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const Restaurant = () => {

    let params = useParams<any>();

    const [restaurantDetails, setRestaurantDetails] = useState<any>([]);
    const [food, setFood] = useState<any>([]);
    const [lineItems, setLineItems] = useState([]);
    const [modalIsOpen, setModal] = useState(false);
    const [imageUrl, setImageUrl] = useState("/images/shop.jpg")

    const [haveFood, setHaveFood] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        RestaurantService.getRestaurant(params.id).then((response) => {
            console.log(response.data)
            setRestaurantDetails(response.data)
            if (response.data.picture) {
                setImageUrl(response.data.picture.url);
            }
            if (response.data.discount) {
                setDiscount(response.data.discount.discountPercentage);
            }
        })
    }, [params])

    useEffect(() => {
        RestaurantService.getAllFood(params.id).then((response) => {
            setFood(response.data)
            setLoading(false);
        })
    }, [params])

    useEffect(() => {
        setTotalPrice(0);
        lineItems.map((lineItem: any) => {
            return setTotalPrice((old) => old + lineItem.food.foodPrice * lineItem.quantity)
        })
    }, [lineItems])


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
                <div className="absolute z-10 ">
                    <div className="grid grid-cols-9 gap-x-16 md:mx-4 my-10">
                        <h2 className="md:col-span-1">&nbsp;</h2>
                        <div className="col-span-2 md:w-40 h-40 w-32">
                            <img className="object-contain rounded-full" src={imageUrl} alt="shop" />
                        </div>
                        <div className="col-span-6 px-0">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-green-standard flex items-center gap-x-4">{restaurantDetails.restaurantName} 
                            <AiFillHeart/> <AiOutlineHeart /> 
                            </h1>
                            <p className="text-lg md:text-2xl text-green-standard">{restaurantDetails.restaurantDesc}</p>
                            <p className="text-md md:pb-4 text-grey-standard">{restaurantDetails.restaurantLocation}</p>
                        </div>
                    </div>
                </div>
                <svg className="waves h-72 w-full transform -rotate-180 " xmlns="http://www.w3.org/2000/svg" viewBox="100 20 130 70" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="100" y="2" fill="rgba(243, 232, 201, 1)" />
                    </g>
                </svg>
            </div>

            <div className="grid items-end mx-16 md:mx-0 md:justify-end md:mr-24">
                <button className=" text-white-standard py-2 px-5 bg-green-standard rounded-xl shadow-md hover:shadow-lg" onClick={makeReservationButtonClick}>Make Reservation</button>
            </div>
            {haveFood &&
                <h1 className="text-right text-red-standard mr-24">Please select some food</h1>
            }
            <div className="gap-x-16  grid items-center justify-items-center 3xl:grid-cols-6 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-y-16 md:mx-24 mt-10 pb-8 animate__animated animate__fadeIn">
                {
                    food?.map(
                        (food: any) => <RestaurantFood {...{ food, setLineItems }} key={food.foodId} />
                    )
                }
            </div>
            {
                loading && 
                <div className="flex justify-center">
                    <Loading />
                </div>
            }
            <ReservationModal {...{ id: params, modalIsOpen, lineItems, totalPrice, setModal, discount }} />
        </div>
    )
}



export default Restaurant
