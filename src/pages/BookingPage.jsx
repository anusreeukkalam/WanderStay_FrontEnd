import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import { differenceInCalendarDays, format } from "date-fns";


export default function BookingPage(){
   
    const {id}=useParams();
    const [booking,setBooking]=useState('');

    useEffect(()=>{
        if(id){
         axios.get('/bookings').then(response=>{
            const foundBooking = response.data.find(({_id})=> _id===id);
            if(foundBooking){
                setBooking(foundBooking);
            }
         });
        }
    },[id]);

    if(!booking){
        return '';
    }

    return (
    <div> 
        
        <div className=" flex items-center gap-4 bg-gray-200 p-4 my-6 rounded-2xl justify-between">
            <div > 
            <h1 className="text-xl lg:text-2xl mx-3 mt-2 mb-3 font-semibold font-style: italic " >{booking.place.title}</h1>
            <AddressLink className="m-2 " children={booking.place.address}/>
            </div>
            <div className="py-3 ">
                 Booked From : {format(new Date(booking.checkIn),'dd-MM-yyyy')} &rarr; To :  {format(new Date(booking.checkOut),'dd-MM-yyyy')} <br/>
                 <div className="flex items-center gap-1 mt-2 text-gray-500 ">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                 </svg>
                 {differenceInCalendarDays((booking.checkOut),(booking.checkIn))} nights | {differenceInCalendarDays((booking.checkOut),(booking.checkIn))+1} days
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                 </svg>
                 </div> 
            </div>  
            <div className=" bg-primary text-lg font-semibold text-white rounded-xl p-3 text-center mr-3 ">
                Total Price: {differenceInCalendarDays((booking.checkOut),(booking.checkIn))* booking.place.price}/-
            </div>   
        </div>
        <PlaceGallery place={booking.place}/>
    </div>
    );
}
