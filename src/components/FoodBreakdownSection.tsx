import moment from 'moment';
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { MdFastfood } from 'react-icons/md'
import RestaurantService from '../services/RestaurantService';
import IngredientBreakdownListing from './IngredientBreakdownListing';
import Loading from './Loading';

const FoodBreakdownSection = (props: any) => {

    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const [restaurantId, setRestaurantId] = useState(0);
    const [foodBetween, setFoodBetween] = useState<any>({})
    const [foodLoading, setFoodLoading] = useState(false);
    const [foodError, setFoodError] = useState("")

    useEffect(() => {
        if (props.restaurantId === 0) {
            return;
        }
        setRestaurantId(props.restaurantId);
    }, [props])

    useEffect(() => {
        setStartDate(new Date());
        var newDate = new Date();
        newDate.setDate(newDate.getDate() + 7);
        setEndDate(newDate);
    }, [])

    useEffect(() => {
        if (restaurantId === 0) {
            return;
        }
        setFoodLoading(true);
        setFoodError("");
        setFoodBetween({});

        const start = moment(startDate).format("YYYY-MM-DD");
        const end = moment(endDate).format("YYYY-MM-DD");

        RestaurantService.getFoodBetween(restaurantId, start, end).then((response) => {
            setFoodBetween(response.data)
            setFoodLoading(false);
        }).catch(err => {
            setFoodError(err.response.data.message);
            setFoodLoading(false);
        })

    }, [restaurantId, startDate, endDate])

    return (
        <div className="bg-white-dirtyWhite rounded-xxl p-7">
            <div className="flex gap-x-4 pb-2">
                <MdFastfood className="text-green-standard text-2xl my-auto " />
                <h1 className="text-green-standard text-xl font-semibold tracking-wide">Food required</h1>
                <div>
                    <ReactDatePicker className="focus:outline-none w-32 text-center py-1 rounded-full border"
                        selected={startDate} onChange={(date: any) => setStartDate(date)} selectsStart
                        dateFormat="dd/MM/yyyy" startDate={startDate} endDate={endDate} />
                </div>
                <div>
                    <ReactDatePicker className="focus:outline-none w-32 text-center py-1 rounded-full border"
                        selected={endDate} onChange={(date: any) => setEndDate(date)} selectsEnd
                        dateFormat="dd/MM/yyyy" startDate={startDate} endDate={endDate} />
                </div>
            </div>

            <div className="grid grid-cols-6">
                <div className="col-span-1"></div>
                <h1 className="text-grey-standard text-base col-span-3">Food</h1>
                <h1 className="text-grey-standard text-base col-span-2 mb-3">Quantity</h1>
            </div>


            <div className="overflow-y-auto h-64">
                {
                    foodLoading && <div className="flex justify-center bg-white-standard rounded-xxl"><Loading /></div>
                }
                <div className="text-red-standard text-center">{foodError}</div>
                {Object.keys(foodBetween).map((food) => (
                    <IngredientBreakdownListing ingredient={food} quantity={"x " + foodBetween[food]} key={food} />
                ))}
            </div>

        </div>
    )
}

export default FoodBreakdownSection
