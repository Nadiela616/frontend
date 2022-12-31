import React, { useState, useEffect } from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


const Map = ({ trips }) => {
    const [destinations, setDestinations] = useState([])
    const [coordinates, setCoordinates] = useState([]);

     const parseCords = async (destination) => {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`);
        const data = await response.json();
        if (data.length > 0) {
            const trip = {
                lat: data[0].lat,
                lon: data[0].lon,
                destination
            };
            const nextState = [...coordinates, trip];
            setCoordinates(nextState);
        }
    }

        const getCords = async() => {
            trips.map(async (item)=>{
                // parseCords(item.destination)
                // console.log(item.destination)
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${item.destination}`);
                const data = await response.json();
                if (data.length > 0) {
                    const trip = {
                        lat: data[0].lat,
                        lon: data[0].lon,                        
                    };
                    const nextState = [...coordinates, trip];
                    setCoordinates(nextState);
                }
            })
        }

        useEffect(()=>{
            getCords()
        },[])

        


        return (
            <div>
                <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false} id="mapcontainer">

                    <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                    <div className="button-container">
                        <div className="button-block">
                            <div className="button-map" >
                                <button id="mapB" type="button">Map</button>
                            </div>
                            <div className="button-table">
                                <button id="tableB" type="button">Table</button>
                            </div>
                        </div>
                    </div>              
                </MapContainer>
            </div>
        )
    }


export default Map

