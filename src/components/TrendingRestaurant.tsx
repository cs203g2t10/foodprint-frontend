import React from 'react'

const TrendingRestaurant = (props: any) => {
    return (
        <div className="w-64 flex-none">
            <img className="object-cover w-full h-40 rounded-xl bg-green-standard" src={props.src} alt="restaurant" />
            <h2 className="text-grey-dark text-xl md:pt-3 pl-1 ">{props.name}</h2>
            <h3 className="text-grey-light text-base md:pt-1 pl-1">{props.location}</h3>
        </div>
    )
}

export default TrendingRestaurant
