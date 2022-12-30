import "../styles.css";
import Header from "../components/Header.js";
import { useNavigate } from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";
// import { Icon } from "leaflet";
import Footer from "../components/Footer";


export default function App() {
  const [coordinates, setCoordinates] = useState([]);
  const navigate = useNavigate();
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
  function gotoMap(){
    navigate("/map");
  }
  function gotoTable(){
    navigate("/trips");
  }

  return (
    <div>
      <Header />
      
        <div className="button-block">
          <div className="button-map" >
            <button type="button" onClick={gotoMap}>Map</button>
          </div>
          <div className="button-table">
            <button type="button" onClick={gotoTable}>Table</button>
          </div>
          </div>
        
      <div className="map-container">
      
        <MapContainer center={[51.505, -0.09]} zoom={4} scrollWheelZoom={false}  id="mapcontainer">
  
          <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
         
          {coordinates.map(({ lat, lon, destination }, index) => (
            <Marker key={index} position={[lat, lon]}>
              <Popup>
                <div className="map-card">
                 <form>

                 </form>
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
