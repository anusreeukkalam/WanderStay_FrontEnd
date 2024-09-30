import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage(){
    
    const {id}=useParams();
    console.log({id});
    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [addedPhotos,setAddedPhotos]=useState([]);
    const [description,setDescription]=useState('');
    const [perks,setPerks]=useState('');
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [maxGuests,setMaxGuests]=useState('');
    const[price,setPrice]=useState('');
    const [redirect,setRedirect]=useState(false);

    useEffect(()=>{
      if(!id){
       console.log('no id provided');
       return ;
      }
      else
      {
      axios.get('/places/'+id).then(response=>{
       const data=response.data;
       console.log(data);
       setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.photos);
       setDescription(data.description);
       setPerks(data.perks);
       setExtraInfo(data.extraInfo);
       setCheckIn(data.checkIn);
       setCheckOut(data.checkOut);
       setPrice(data.price);
       setMaxGuests(data.maxGuests);
      }).catch((error)=>{
       console.log('error fetching place data:',error);
      }); 
      } 
    },[id]);

    function inputHeader(text){
        return(
          <h2 className=" text-lg mt-2">{text}</h2>
        );
      }
      
      async function savePlace(ev){
       ev.preventDefault(); 
       const placeData={
              title, 
              address,
              addedPhotos,
              description,
              perks,
              extraInfo,
              checkIn,
              checkOut,
              price,
              maxGuests
       };
       if(id){ //if u have an id update the place
              await axios.put('/places', {
                     id,...placeData
                     });
                     setRedirect(true);
       }
       else
       { // no id so add new place
              await axios.post('/places',placeData);
               setRedirect(true);
       }
      
      }

     if(redirect) {
        return <Navigate to={'/account/places'} />
     }

    return (
    <div> 
        <AccountNav />
        <form onSubmit={savePlace}>
        {inputHeader('Title')}
         <input className="border border-gray-400 text-sm "
                type="text" 
                value={title}
                onChange={ev=>setTitle(ev.target.value)}
                placeholder="a catchy title to your place" />
         {inputHeader('Address')}
         <input className="border border-gray-400 text-sm  "  
                type="text" 
                value={address}
                onChange={ev=>setAddress(ev.target.value)}
                placeholder="Address of this place" />    
         {inputHeader('Photos')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
         {inputHeader('Description')}
         <textarea className="border border-gray-400  rounded-2xl w-full  h-32 mt-2 px-3 py-2" 
                   value={description}
                   onChange={ev=>setDescription(ev.target.value)}
                   placeholder="Description about the place!"/>
         {inputHeader('Perks')}
         <Perks selected={perks} onChange={setPerks}/>
         <div className="flex flex-row text-lg justify-between  ">
         <h2 className="w-1/3" >CheckIn & CheckOut Time:</h2>
         <h2 className="w-1/3 px-3" > Number Of Guests:</h2>
         </div>
         <div className="grid gap-3 sm:grid-cols-3">
           <div>
           <input type="text" 
                  value={checkIn}
                  onChange={ev=>setCheckIn(ev.target.value)}
                  placeholder="IN>12:00 PM" />
           </div>
           <div>
           <input type="text" 
                  value={checkOut}
                  onChange={ev=>setCheckOut(ev.target.value)}
                  placeholder="OUT<11:00 AM" />
           </div>
           <div>
           <input className=" border border-gray-400 rounded-xl h-10 mt-2 w-full px-3 " 
                  type="Number" 
                  value={maxGuests}
                  onChange={ev=>setMaxGuests(ev.target.value)}
                  placeholder="Maximum:4" />
           </div>
          </div>
          <div>
              {inputHeader('Price Per Night:')}
           <input type="text" 
                  value={price}
                  onChange={ev=>setPrice(ev.target.value)}
                  placeholder="Specify your Price for 1 Night" />
           </div>
          {inputHeader('Extra Info:')}
         <textarea className="border border-gray-400  rounded-2xl w-full h-20 mt-2 px-3 py-2" placeholder="Additonal information like house rules,etc."
                   value={extraInfo}
                   onChange={ev=>setExtraInfo(ev.target.value)}/>
         <div>
          <button className="primary my-3 mb-3">Save</button>
         </div>
        </form>    
      </div> 
    );
}