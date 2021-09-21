import React from 'react'

const TrendingRestaurant = (props) => {
    

    return (
        <div className="w-64">
            <img className="rounded-xl" width = "240" height = "300" src={props.src} alt="restaurant" />
            <h2 className="text-grey-standard text-lg md:pt-3 pl-1">{props.name}</h2>
            <h3 className="text-grey-light text-base md:pt-1 pl-1">{props.location}</h3>
        </div>
    )
}

export default TrendingRestaurant
