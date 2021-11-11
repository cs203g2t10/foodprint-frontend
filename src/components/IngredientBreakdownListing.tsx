const IngredientBreakdownListing = (props: any) => {

    return (
        <div className="bg-white-standard rounded-large grid grid-cols-6 mb-3">
            <div className="col-span-1 h-12 my-2"></div>
            <h1 className="my-auto text-base col-span-3 ">{props.ingredient}</h1>
            <h1 className="my-auto text-base col-span-1">{props.quantity}</h1>
            <h1 className="my-auto text-base col-span-1">{props.units}</h1>
        </div>
    )
}

export default IngredientBreakdownListing