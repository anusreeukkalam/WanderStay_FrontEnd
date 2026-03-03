import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";

export default function IndexPage() {

  const [places, setPlaces] = useState([]);
  const { searchQuery } = useContext(UserContext);

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces([...response.data]);
    });
  }, []);

  const safeSearch = searchQuery || "";
  const filteredPlaces = places.filter(place =>
    (place.title && place.title.toLowerCase().includes(safeSearch.toLowerCase())) ||
    (place.address && place.address.toLowerCase().includes(safeSearch.toLowerCase()))
  );

  return (
    <div className="mt-8 flex flex-col gap-6">

      {/* Places Grid */}
      <div className="gap-x-6 gap-y-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredPlaces.length > 0 ? filteredPlaces.map(place => (
          <Link to={'/place/' + place._id} key={place._id} className="group flex flex-col h-full hover:scale-[1.02] transition-transform duration-200">
            <div className="bg-gray-300 dark:bg-gray-700 mb-3 rounded-2xl flex relative overflow-hidden aspect-square shadow-sm dark:shadow-black">
              {place.photos?.[0] && (
                <img className="rounded-2xl w-full h-full object-cover group-hover:opacity-90 transition-opacity" src={place.photos?.[0]} alt={place.title} />
                //<img className="rounded-2xl aspect-square object-cover" src={'https://wanderstay-backend-w6tg.onrender.com/uploads/'+place.photos?.[0]} alt="" />
              )}
            </div>
            <h2 className="text-md font-bold ml-1 truncate dark:text-gray-100">{place.title}</h2>
            <h2 className="text-sm text-gray-500 dark:text-gray-400 ml-1 truncate">{place.address}</h2>
            <div className="text-sm font-style: italic ml-1 mt-1 dark:text-gray-300">
              Per Night: <span className="font-semibold text-primary dark:text-pink-400">{place.price}/-</span>
            </div>
          </Link>
        )) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
            {places.length === 0 ? "Loading places..." : "No places found matching your search."}
          </div>
        )}
      </div>
    </div>
  );
}