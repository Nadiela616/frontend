import "../styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from "react";

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
      <form id="form" onSubmit={getCoordinates}>
        <label>
          <span>Destination:</span>
          <input
            type="text"
            name="destination"
            placeholder="Adress/point of interest"
          />
        </label>
        <button type="submit">Find coordinates</button>
      </form>
      <div className="map-container">
        <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
          <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          {coordinates.map(({ lat, lon, destination }, index) => (
            <Marker key={index} position={[lat, lon]}>
              <Popup>{destination}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
