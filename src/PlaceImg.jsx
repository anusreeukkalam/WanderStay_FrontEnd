export default function PlaceImg({ place, index = 0, className = null }) {
    if (!place.photos?.length) {
        return '';
    }
    if (!className) {
        className = 'w-full h-full object-cover ';
    }
    const photo = place.photos[index];
    const src = photo.includes('http') ? photo : 'https://wanderstay-backend-w6tg.onrender.com/uploads/' + photo;
    return (
        <img className={className} src={src} alt="" />
    );
}