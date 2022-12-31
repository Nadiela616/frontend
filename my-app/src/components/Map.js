import React, { useState, useEffect } from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


const Map = ({ trips }) => {   

        return (
            <div>
                <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false} id="mapcontainer">

                    <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                    {trips.map((trip, index) => (
            <Marker key={index} position={[trip.latitude, trip.longitude]}>
              <Popup>
                <div className="map-card">
                <p>{trip.days}</p>
                <p>{trip.date}</p>
                <p>{trip.country}</p>
                <p>{trip.destination}</p>
                <p>{trip.description}</p>
                <p>{trip.rating}</p>
                </div>
              </Popup>
            </Marker>
          ))}            
                </MapContainer>
            </div>
        )
    }


export default Map


