import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"; 

export default function IndexPage() {

  const [places,setPlaces]=useState([]);
;
  useEffect(()=>{
    axios.get('/places').then(response=>{
      setPlaces([...response.data]);
    });
  },[]);
  
  return(
    <div className="mt-6 gap-x-6 gap-y-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    {places.length>0 && places.map(place=>(
       <Link to={'/place/'+place._id}>
        <div className="bg-gray-500 my-3 rounded-2xl flex">
        {place.photos?.[0]&&(
           <img className="rounded-2xl aspect-square object-cover" src={place.photos?.[0]} alt="" />
           //<img className="rounded-2xl aspect-square object-cover" src={'https://wanderstay-backend-w6tg.onrender.com/uploads/'+place.photos?.[0]} alt="" />

        )}
        </div>
        <h2 className="text-md font-bold ml-3 truncate">{place.title}</h2> 
        <h2 className="text-sm text-gray-500 ml-3">{place.address}</h2> 
        <div className="text-sm font-style: italic ml-3 mt-1">
          Per Night : <span className="font-semibold">{place.price}/-</span> 
        </div>
       </Link>
    ))}
    </div>
  );
}