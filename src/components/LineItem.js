// import React, { useEffect, useState } from 'react'
// import { useHistory, useParams } from 'react-router';
// import RestaurantService from '../services/RestaurantService';

// const LineItem = () => {
//     let history = useHistory();
//     let id = useParams();
//     const [restaurantDetails, setRestaurantDetails] = useState([]);
//     const [foodDetails, setFoodDetails] = useState([]);
//     // const [lineItems, setLineItems] = useState([]);

//     useEffect(() => {
//         RestaurantService.getRestaurant(id.id).then((response) => {
//             setRestaurantDetails(response.data)
//         })
//         RestaurantService.getFood(id.id, id.foodId).then((response) => {
//             setFoodDetails(response.data)
//         })
//     }, [id])

//     // const [food, setFood] = useState();
//     const [quantity, setQuantity] = useState(0);

//     console.log(id)

//     const escape = () => {
//         history.goBack();
//     }

//     const addLineItem = () => {
//         console.log(quantity)
//     }

//     return (
//         <div className="fixed z-10 inset-0 " >
//             <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
//                 <div className="py-10 bg-yellow-standard mx-12 mt-20 rounded-lg border">

//                     <h1 className="text-2xl">{foodDetails.foodName} - ${foodDetails.foodPrice}</h1>
//                     <h1 className="text-lg">{foodDetails.foodDesc}</h1>

//                     <p className="pb-2 pt-4">Quantity: </p>
//                     <input onChange={e => setQuantity(e.target.value)} className=" px-3 py-1 rounded" placeholder="0" type="number" min="0" max="20"/>

//                     <div className="flex justify-center my-4 gap-x-4">
//                         <button onClick={addLineItem} className="border px-4 ">Confirm</button>
//                         <button onClick={escape} className="border px-4 ">Cancel</button>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default LineItem
