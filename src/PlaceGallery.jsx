import { useState } from "react";

export default function PlaceGallery({place}){
 
    const [showAllPhotos,setShowAllPhotos]=useState(false);

    if(showAllPhotos){
        return (
         <div className="absolute inset-0 bg-black text-white min-h-screen text-center">
         <div className="bg-black p-8 grid gap-4 ">
            <div>
                <h2 className="text-2xl font-style: italic mt-2 mb-6 ">Photo Gallery of {place.title}</h2>
                <button onClick={()=>setShowAllPhotos(false)} className="fixed -mt-5 ml-4 flex  items-center border border-white rounded-2xl px-3 py-1 bg-gray-800 font-semibold text-sm "> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M4.72 9.47a.75.75 0 0 0 0 1.06l4.25 4.25a.75.75 0 1 0 1.06-1.06L6.31 10l3.72-3.72a.75.75 0 1 0-1.06-1.06L4.72 9.47Zm9.25-4.25L9.72 9.47a.75.75 0 0 0 0 1.06l4.25 4.25a.75.75 0 1 0 1.06-1.06L11.31 10l3.72-3.72a.75.75 0 0 0-1.06-1.06Z" clipRule="evenodd" />
                </svg>
                    Close All Photos
                    </button>
            </div>
         {place?.photos?.length>0 && place.photos.map(photo=>(
            <div className=" flex justify-center ">
                <img className="aspect-square h-[36rem] w-[36rem] object-cover" src={'http://localhost:4000/uploads/'+photo} alt="" />
            </div>
         ))}
         </div>
         </div>
        );
    }

    return (
        <div className="relative">
          <div className="grid gap-2 grid-cols-[2fr_1fr_1fr] mt-6 rounded-2xl overflow-hidden">{/* we are using custom grid for having 2 columns of different width, first one of 2/3, secind 1/3*/ }
            <div>
                {place.photos?.[0] && (
                    <div>
                       <img onClick={()=>setShowAllPhotos(true)} className=" cursor-pointer aspect-square object-cover max-w-full " src={'http://localhost:4000/uploads/'+place.photos[0]} alt=""></img>
                     </div>  
                )}
            </div>
            <div className="grid ">
            {place.photos?.[1] && (
                    <img onClick={()=>setShowAllPhotos(true)} className=" cursor-pointer aspect-square object-cover max-w-full  " src={'http://localhost:4000/uploads/'+place.photos[1]} alt=""></img>
                )}
                <div className="overflow-hidden">
                {place.photos?.[2] && (
                    <img onClick={()=>setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2  " src={'http://localhost:4000/uploads/'+place.photos[2]} alt=""></img>
                )}
                </div>
            </div>
            <div className="grid">
            {place.photos?.[3] && (
                    <img onClick={()=>setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover " src={'http://localhost:4000/uploads/'+place.photos[3]} alt=""></img>
                )}
                <div className="overflow-hidden">
                {place.photos?.[4] && (
                    <img onClick={()=>setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover relative top-2" src={'http://localhost:4000/uploads/'+place.photos[4]} alt=""></img>
                )}
                </div>
            </div>
          </div>
          <button onClick={() => setShowAllPhotos(true)} className="flex items-center absolute bottom-2 lg:bottom-4 right-3 lg:right-6 bg-white rounded-xl border border-2 border-black text-xs lg:text-sm font-semibold p-1 lg:p-2  "> 
          Show More Photos
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" />
          </svg>
            </button>
        </div>
    );
}