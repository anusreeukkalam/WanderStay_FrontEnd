import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";

export default function BookingsPage(){

    const [bookings,setBookings]=useState([]);

    useEffect(()=>{
      axios.get('/bookings').then(response=>{
       setBookings(response.data);
      });
    },[]);

    return (
     <div>
        <AccountNav/>
        <div className="flex justify-center items-center ">
        <div className="mx-5 grid gap-4 ">
          {bookings?.length>0 && bookings.map(booking => (
            <Link to={`/account/bookings/${booking._id}`} className="flex items-center  gap-5 bg-gray-200 rounded-xl mt-2 overflow-hidden md:w-[40rem] lg:w-[48rem]">
                <div className="w-[18rem] h-[18rem] ">
                    <PlaceImg place={booking.place} />
                </div>
                <div className="py-3 ">
                  <h2 className="text-2xl font-semibold mb-2 ">{booking.place.title}</h2>
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
                  <div className="font-style: italic text-lg mt-2">
                    Total Price : {(booking.price)}/-
                  </div>
                </div>
            </Link>
          ))}
        </div>
        </div> 
     </div>
    );
}