import moment from 'moment';
import { useEffect, useState } from 'react'
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
        <div className="bg-white-dirtyWhite shadow-md rounded-xxl p-7">
            <div className="flex pb-2 gap-x-4">
                <MdFoodBank className="text-green-standard text-3xl my-auto filter drop-shadow" />
                <h1 className="text-green-standard text-xl font-semibold tracking-wide filter drop-shadow-sm">Ingredients required</h1>
            </div>
            <div className="grid grid-cols-2 pb-6 gap-x-4">
                <div>
                    <h1 className="text-sm mb-1 text-gray-500 pl-3">Date From:</h1>
                    <ReactDatePicker className="focus:outline-none pl-5 py-1 rounded-full shadow text-gray-600 w-full hover:shadow-md"
                        selected={startDate} onChange={(date: any) => setStartDate(date)} selectsStart
                        dateFormat="dd/MM/yyyy" startDate={startDate} endDate={endDate} />
                </div>
                <div>
                    <h1 className="text-sm mb-1 text-gray-500 pl-3">Date To:</h1>
                    <ReactDatePicker className="focus:outline-none pl-5 py-1 h-8 rounded-full shadow text-gray-600 w-full hover:shadow-md"
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
                    ingredientsLoading && <div className="flex justify-center bg-white-standard rounded-lg"><Loading /></div>
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
