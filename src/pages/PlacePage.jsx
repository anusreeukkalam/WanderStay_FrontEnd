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

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] text-lg mx-2 mt-8 gap-10">
        <div>
          <div className="mb-2">
            <h2 className="text-2xl font-semibold mb-3 dark:text-gray-100">Description</h2>
            <div className="dark:text-gray-300 text-gray-700">
              {place.description}
            </div>
          </div>
          <div>
            <div className="ml-5 font-style: italic dark:text-gray-400 text-gray-600 my-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <span className="font-semibold dark:text-gray-200">Check In:</span> {place.checkIn} <br />
              <span className="font-semibold dark:text-gray-200">Check Out:</span> {place.checkOut} <br />
              <span className="font-semibold dark:text-gray-200">Maximum Guests:</span> {place.maxGuests}
            </div>
            <div>
              <h2 className="text-xl font-semibold mt-6 mb-2 dark:text-gray-100">Extra Information</h2>
              <div className="text-gray-500 dark:text-gray-400 text-sm leading-6 mb-4">
                {place.extraInfo}
              </div>
            </div>

            {/* Interactive Map */}
            <div className="mt-8 mb-4">
              <h2 className="text-xl font-semibold mb-3 dark:text-gray-100">Location Map</h2>
              <PlaceMap address={place.address} />
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 italic text-center">Interactive map for illustrative purposes</p>
            </div>
          </div>
        </div>

        <div>
          <BookingWidget place={place} />
        </div>
      </div>
    </div>
  );
}