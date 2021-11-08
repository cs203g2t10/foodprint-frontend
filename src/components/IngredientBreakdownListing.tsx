const IngredientBreakdownListing = (props: any) => {

    return (
        <div className="bg-white-standard rounded-large flex grid grid-cols-6 mb-3">
            <img className="h-12 w-12 mx-4 my-2 object-cover rounded-lg col-span-1 " src="/images/forkspoon.jpg" alt="restaurant"/>
            <h1 className="my-auto text-base col-span-3">{props.ingredient}</h1>
            <h1 className="my-auto text-base col-span-1">{props.quantity}</h1>
            <h1 className="my-auto text-base col-span-1">{props.units}</h1>
        </div>
    )
}

export default IngredientBreakdownListing