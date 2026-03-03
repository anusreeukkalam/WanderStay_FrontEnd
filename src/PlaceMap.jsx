import React from 'react';

export default function PlaceMap({ address }) {
    if (!address) return null;
    const encodedAddress = encodeURIComponent(address);

    return (
        <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden mt-6 bg-gray-200 dark:bg-gray-800 shadow-md dark:shadow-black/50 border border-gray-300 dark:border-gray-700">
            <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                title={`Map of ${address}`}
            ></iframe>
        </div>
    );
}
