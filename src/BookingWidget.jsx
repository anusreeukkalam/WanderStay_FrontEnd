import { useContext, useEffect, useState } from "react"; 
import {differenceInCalendarDays} from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";


export default function BookingWidget({place}){
    
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [numberOfGuests,setNumberOfGuests]=useState(1);
    const [name,setName]=useState('');
    const [phone,setPhone]=useState('');
    const [redirect,setRedirect]=useState('');
    const {user}=useContext(UserContext);

    useEffect(()=>{
      if(user){
        setName(user.name);
      }
    },[user]);

    let numberOfNights=0;
    if(checkIn && checkOut) {
        numberOfNights=differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }

   async function bookThisPlace(){
        const response= await axios.post('/bookings',{
        checkIn,checkOut,numberOfGuests,name,phone,
        place:  place._id,
        price: numberOfGuests*place.price,
    });
    const bookingId=response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow-lg p-4 rounded-2xl text-center max-w-sm max-h-[32rem] ">
        <div>
        Price : {place.price}/- per Night
       </div>
        <div className="text-sm border border-gray-300 my-5 rounded-xl">
            <div className="flex border-b border-gray-300">
              <div className="py-5 px-4 ">
                <label> CheckIn:</label>
                <input type="date" 
                       value={checkIn}
                       onChange={ ev => setCheckIn(ev.target.value)}/>
              </div>
              <div className="py-5 px-4 border-l border-gray-400 ">
                <label> CheckOut:</label>
                <input type="date" 
                       value={checkOut} 
                       onChange={ ev => setCheckOut(ev.target.value)} />
              </div>
            </div>
            <div className="my-2 mx-4 ">
             <label> Required Accomodation : </label>
             <input type="number" 
                    value={numberOfGuests} 
                    onChange={ev => setNumberOfGuests(ev.target.value)}/>
            </div>
            {numberOfNights>0 && (
                <div className="my-2 mx-2 ">
                <label> Full Name:  </label>
                <input type="text" 
                       value={name} 
                       onChange={ev => setName(ev.target.value)}/>
                <label> Phone Number:  </label>
                <input type="tel" 
                       value={phone} 
                       onChange={ev => setPhone(ev.target.value)}/>
               </div>
            )}
        </div>
        <button onClick={bookThisPlace} className=" rounded-lg px-20  mt-1 bg-primary text-white text-md py-1" > 
            Book Now For : {numberOfNights>0 && (
                <span>{numberOfNights*place.price}/-</span>
            )}
            </button>
    </div>
    );
}