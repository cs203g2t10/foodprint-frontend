const ShowRestaurant = (props: any) => {
    return (
        <div className="bg-white-creamWhite h-full w-64 shadow-md hover:shadow-lg rounded-xl flex-none pb-1">
            <img className="object-cover w-full h-40 rounded-xl bg-green-standard" src={props.src} alt="restaurant" />
            <h2 className="text-grey-dark text-xl md:pt-3 pl-5">{props.name}</h2>
            <h3 className="text-grey-light text-base md:pt-1 pl-5 pb-3">{props.location}</h3>
        </div>
    )
}

export default ShowRestaurant
