import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import PlaceMap from "../PlaceMap";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';

  return (
    <div className="mt-4 bg-gray-100 dark:bg-gray-900 -mx-8 px-12 py-8 transition-colors duration-300">
      <h1 className="text-xl lg:text-3xl font-bold dark:text-gray-100">{place.title}</h1>
      <AddressLink children={place.address} />
      <PlaceGallery place={place} />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] text-lg mx-2 mt-8 gap-x-10 gap-y-12">
        {/* ROW 1: LEFT - Description and host box */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 dark:text-gray-100">Description</h2>
            <div className="dark:text-gray-300 text-gray-700">
              {place.description}
            </div>
          </div>
          <div className="font-style: italic dark:text-gray-400 text-gray-600 my-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="font-semibold dark:text-gray-200">Check In:</span> {place.checkIn} <br />
                <span className="font-semibold dark:text-gray-200">Check Out:</span> {place.checkOut} <br />
                <span className="font-semibold dark:text-gray-200">Maximum Guests:</span> {place.maxGuests}
              </div>
              <div>
                <span className="font-semibold dark:text-gray-200">Host:</span> {place.owner?.name ? place.owner.name : 'Superhost'} <br />
                <span className="font-semibold dark:text-gray-200">Contact:</span> +91 *******{Math.floor(Math.random() * 900) + 100} <br />
              </div>
            </div>
          </div>
        </div>

        {/* ROW 1: RIGHT - Booking Widget */}
        <div>
          <BookingWidget place={place} />
        </div>

        {/* ROW 2: LEFT - Location Map */}
        <div>
          <h2 className="text-xl font-semibold mb-3 dark:text-gray-100">Location Map</h2>
          <PlaceMap address={place.address} />
        </div>

        {/* ROW 2: RIGHT - Extra Information */}
        <div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 h-full">
            <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">Extra Information</h2>
            <div className="text-gray-500 dark:text-gray-400 text-sm leading-6">
              {place.extraInfo}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}