import { FiSearch } from "react-icons/fi"
import RestaurantService from "../services/RestaurantService";
import "../css/searchbar.css"

const SearchBar = (props: any) => {

    const {changeRestaurants} = props;

    const onChangeFunction = async (event: any) => {
        console.log(event.target.value);
        if (event.target.value) {
            RestaurantService.searchRestaurant(event.target.value).then((suggestions) => {

                let rslts = suggestions.data.content.filter((suggestions: any)=>{
                    return suggestions.restaurantName.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()); 
                });

                if (rslts.length === 0) {
                    return;
                }
                
                changeRestaurants(suggestions.data.content);
            });
        }
    }
    
    return <div className="bg-white-offWhite h-10 w-1/2 flex items-center rounded-xl shadow-lg mx-auto m-8">
        <div className="px-5">
            <FiSearch />
        </div>

        <input 
            className="bg-white-offWhite flex w-full h-10 focus:outline-none rounded-xl pr-5"
            placeholder="Find what you are looking for..."
            onChange = {onChangeFunction}        
        />
    </div>
}

export { SearchBar }
