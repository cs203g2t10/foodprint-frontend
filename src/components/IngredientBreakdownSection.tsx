import moment from 'moment';
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import { MdFoodBank } from 'react-icons/md'
import RestaurantService from '../services/RestaurantService';
import IngredientBreakdownListing from './IngredientBreakdownListing';
import Loading from './Loading';

const IngredientBreakdownSection = (props: any) => {

    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const [restaurantId, setRestaurantId] = useState(0);
    const [ingredientsBetween, setIngredientsBetween] = useState<any[]>([])
    const [ingredientsLoading, setIngredientsLoading] = useState(false);
    const [ingError, setIngError] = useState("");

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
        setIngredientsLoading(true);
        setIngError("");
        setIngredientsBetween([]);

        const start = moment(startDate).format("YYYY-MM-DD");
        const end = moment(endDate).format("YYYY-MM-DD");

        RestaurantService.getIngredientsBetween(restaurantId, start, end).then((response) => {
            setIngredientsBetween(response.data)
            setIngredientsLoading(false);
        }).catch(err => {
            setIngError(err.response.data.message);
            setIngredientsLoading(false);
        })
    }, [restaurantId, startDate, endDate])

    return (
        <div className="bg-white-dirtyWhite rounded-xxl p-7">
            <div className="flex pb-5 gap-x-4">
                <MdFoodBank className="text-green-standard text-3xl my-auto " />
                <h1 className="text-green-standard text-xl font-semibold tracking-wide">Ingredients between</h1>
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
                <h1 className="text-grey-standard text-base col-span-3">Ingredient</h1>
                <h1 className="text-grey-standard text-base col-span-1 mb-3">Quantity</h1>
                <h1 className="text-grey-standard text-base col-span-1 mb-3">Units</h1>
            </div>

            <div className="overflow-y-auto h-64">
                {
                    ingredientsLoading && <div className="flex justify-center bg-white-standard rounded-xxl"><Loading /></div>
                }
                <div className="text-red-standard text-center">{ingError}</div>
                {
                    ingredientsBetween.map((ingredientsBetween, index) => {
                        return (
                            <IngredientBreakdownListing ingredient={ingredientsBetween.ingredient} key={index}
                                quantity={ingredientsBetween.quantity} units={ingredientsBetween.units} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default IngredientBreakdownSection
