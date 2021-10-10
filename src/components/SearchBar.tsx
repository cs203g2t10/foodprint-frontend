import { useRef } from "react";
import { FiSearch } from "react-icons/fi"
import RestaurantService from "../services/RestaurantService";

const SearchBar = (props: any) => {

    const restaurantSortRef = useRef<HTMLSelectElement>(null);
    const restaurantSearchBoxRef = useRef<HTMLInputElement>(null);
    const restaurantSortDescRef = useRef<HTMLInputElement>(null);
    const {changeRestaurants} = props;

    const onChangeFunction = async (event: any) => {

        if (restaurantSearchBoxRef.current == null
             || restaurantSortRef.current == null
             || restaurantSortDescRef.current == null) {
            return;
        }

        const searchQuery = restaurantSearchBoxRef.current.value;
        const sortBy = restaurantSortRef.current.value;
        const sortDesc = restaurantSortDescRef.current.checked;

        console.log("%s %s", searchQuery, sortBy)

        RestaurantService.searchRestaurant(searchQuery, sortBy, sortDesc).then((suggestions) => {
            const searchResults = suggestions.data.content;          
            changeRestaurants(searchResults);
        });
    }
    
    return <>
        <div className="bg-white-offWhite h-10 w-1/2 flex items-center rounded-xl shadow-lg mx-auto m-8">
            <div className="px-5">
                <FiSearch />
            </div>

            <input 
                className="bg-white-offWhite flex w-full h-10 focus:outline-none rounded-xl pr-5"
                placeholder="Find what you are looking for..."
                onChange = {onChangeFunction}
                ref = {restaurantSearchBoxRef}
            />
        </div>

        <div className = "flex flex-col items-center space-y-2 rounded-xl mx-auto m-8 w-1/2">
            <div>
                <label htmlFor="restaurantSort">Sort By </label>
                <select name="restaurantSort" id="restaurantSort" ref={restaurantSortRef} onChange = {onChangeFunction}>
                    <option value="restaurantId">Restaurant ID</option>
                    <option value="restaurantName">Restaurant Name</option>
                    <option value="restaurantPriceRange">Price Range</option>
                </select>
            </div>

        <div>
            <label htmlFor="sortDescending">Reverse</label>
                <input type="checkbox" className="form-checkbox" id="sortDescending" onChange={onChangeFunction} ref={restaurantSortDescRef} />
            </div>
        </div>
    </>

}

export { SearchBar }
