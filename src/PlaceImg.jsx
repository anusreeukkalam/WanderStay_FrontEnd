export default function PlaceImg({place,index=0,className=null}){
    if(!place.photos?.length)
    {
        return '';
    }
    if(!className)
    {
        className='w-full h-full object-cover ';
    }
    return (
           <img className={className} src={place.photos[index]} alt="" /> 
           // <img className={className} src={'https://wanderstay-backend-w6tg.onrender.com/uploads/'+place.photos[index]} alt="" />  
    );
}