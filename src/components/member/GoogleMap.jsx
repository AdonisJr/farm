import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

export default function GoogleMap({ apiKey, farms, currentLocation }) {
  const currentPosition = {
    lat: 8.044897231351126,
    lng: 126.21871469053765,
  };

  const getSpecificDate = (created_at) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const date = new Date(created_at);
    const longDate = date.toLocaleDateString("en-US", options);
    return longDate;
  };

  return (
    <APIProvider apiKey={apiKey}>
      <p className='p-4 text-xl font-bold text-slate-500'>Farm Land Visualization</p>
      <div className='w-full h-screen bg-red-500'>
        <Map center={currentPosition} zoom={15} mapId={"73ea4a8d7bc51562"} className='w-full h-full'>
          <Marker position={{ lat: currentLocation.latitude, lng: currentLocation.longitude }} title={"YOUR CURRENT LOCATION"} />
          {farms.map((farm) => (
            farms.latitude === null || farm.longitude === null ? <div key={farm.id}></div> :

              <Marker
                key={farm.id}
                position={{ lat: farm.lat, lng: farm.lng }}
                title={`Owner: ${farm.first_name}${farm.middle_name ? ` ${farm.middle_name}` : ''}${farm.last_name ? ` ${farm.last_name}` : ''}${farm.suffix ? ` ${farm.suffix}` : ''} 
                Lot Size: ${farm.lot_size}`}

                icon={"http://localhost:3000/currentMark.png"}
              />
          ))

          }
        </Map>
      </div>
    </APIProvider>
  )
}



