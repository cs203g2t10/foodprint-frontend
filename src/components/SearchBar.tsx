import { useRef } from "react";
import { FiSearch } from "react-icons/fi"
import RestaurantService from "../services/RestaurantService";

const SearchBar = (props: any) => {

    const restaurantSortRef = useRef<HTMLSelectElement>(null);
    const restaurantSearchBoxRef = useRef<HTMLInputElement>(null);
    const restaurantSortDescRef = useRef<HTMLInputElement>(null);
    const { changeRestaurants } = props;

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
        <div className="grid md:grid-cols-12 mx-4 md:mx-0">
            <h2 className="col-span-2">&nbsp;</h2>
            <div className="col-span-5 bg-white-offWhite h-10 flex items-center rounded-xl shadow-lg mt-8">
                <div className="px-5">
                    <FiSearch />
                </div>

                <input
                    className="bg-white-offWhite flex w-full h-10 focus:outline-none rounded-xl pr-5"
                    placeholder="Find what you are looking for..."
                    onChange={onChangeFunction}
                    ref={restaurantSearchBoxRef}
                />
            </div>

            <div className="col-span-4 items-center rounded-xl flex px-5">
                <div className="mt-8 md:flex items-center gap-x-2">
                    <label htmlFor="restaurantSort" className="text-green-standard">Sort By: </label>
                    <select name="restaurantSort" className="rounded-large h-10 px-3 text-grey-standard shadow-md" id="restaurantSort" ref={restaurantSortRef} onChange={onChangeFunction}>
                        <option value="restaurantId">Restaurant ID</option>
                        <option value="restaurantName">Restaurant Name</option>
                        <option value="restaurantPriceRange">Price Range</option>
                    </select>
                </div>

                <div className="justify-items-center items-center md:flex">
                    <label htmlFor="sortDescending" className=" ml-5 mr-2 text-green-standard mt-8">Dsc:</label>
                    <input type="checkbox" className="form-checkbox checkbox checkbox-md mt-8 inline-block bg-white-standard" id="sortDescending" onChange={onChangeFunction} ref={restaurantSortDescRef} />
                </div>
            </div>
            <h2 className="col-span-2">&nbsp;</h2>
        </div>
    </>

}

export { SearchBar }
