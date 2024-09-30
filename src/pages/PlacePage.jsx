import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage(){

    const {id}=useParams();
    const [place,setPlace]=useState(null);
    const [showAllPhotos,setShowAllPhotos]=useState(false);

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get(`/places/${id}`).then(response=>{
         setPlace(response.data);
        });
    },[id]);
    
    if(!place) return '';

    return (
    <div className="mt-4 bg-gray-100 -mx-8 px-12 py-8">
        <h1 className="text-xl lg:text-3xl" >{place.title}</h1>
        <AddressLink children={place.address}/>
        <PlaceGallery place={place} />
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] text-lg mx-2 mt-8 gap-10 ">
            <div> 
              <div className="mb-2">
               <h2 className="text-2xl font-semibold mb-3 ">Description</h2>
               {place.description}
              </div>
              <div >
                <div className="ml-5 font-style: italic ">
                  Check In: {place.checkIn} <br/>
                  Check Out: {place.checkOut} <br/>
                  Maximum Number Of Guests: {place.maxGuests}
                </div>
                <div>
                    <h2 className="text-lg font-semibold mt-3 mb-1" >Extra Information </h2>
                    <div className="text-gray-500 text-sm leading-6">
                    {place.extraInfo}
                    </div>
                </div>
              </div>
            </div>
           <BookingWidget place={place}/>
        </div>
    </div>
    );
}