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

            {/* Map and Policy Section */}
            <div className="mt-8 mb-4 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-3 dark:text-gray-100">Location Map</h2>
                <PlaceMap address={place.address} />
              </div>

              {/* Added Host / Policies Section */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Things to know</h2>

                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Check-in time
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{place.checkIn}</p>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    Host
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Superhost status. Highly rated for communication and clean spaces.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Cancellation policy
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Free cancellation before 48 hours of check-in.</p>
                </div>
              </div>
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