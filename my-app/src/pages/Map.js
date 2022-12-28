import "../styles.css";
import Header from "../components/Header.js";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
// import { Icon } from "leaflet";
import Footer from "../components/Footer";


export default function App() {
  const [coordinates, setCoordinates] = useState([]);

  async function getCoordinates(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const destination = formData.get("destination");
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
    );
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

  return (
    <div>
      <Header />

      <div className="map-container">
      
        <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>

          <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          <div  className="button-container">
        <div className="button-block">
          <div className="button-map" >
            <button>Map</button>
          </div>
          <div className="button-table">
            <button>Table</button>
          </div>
          </div>
        </div>
          {coordinates.map(({ lat, lon, destination }, index) => (
            <Marker key={index} position={[lat, lon]}>
              <Popup>
                <div className="map-card">
                  <div className="card-header">
                    <p className="p14">10-2022</p>
                    <p className="p14">5 days</p>
                  </div>
                  <div className="card-body">
                    <h3 id="card-country">France</h3>
                    <h1 id="card-city">{destination}</h1>
                    <p id="card-p">Paris is fantastic, but cold as hell.</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <Footer />
    </div>
  );
}
