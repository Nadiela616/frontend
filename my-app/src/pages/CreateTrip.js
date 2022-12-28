import Header from "../components/Header.js";
import Footer from '../components/Footer.js';
import React from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css";

export default function CreateTrip(){
    const navigate = useNavigate();
    const [coordinates, setCoordinates] = React.useState([]);
    React.useEffect(()=>{
        const checkUser = window.localStorage.getItem("user_id")
        console.log("check user",checkUser)
        if(!checkUser){
         navigate("/log-in")
        }
        },[])
        const onSubmit = async (event) => {
            event.preventDefault();
            const form = event.target;
            const formData = new FormData(form);
            const user_id = Number(window.localStorage.getItem("user_id"));
            const date = formData.get("date");
            const destination = formData.get("destination");
            const days = formData.get("days");
            const rating = formData.get("rating");
            const values = { date, destination, days, rating, user_id};
            const response = await fetch(`http://localhost:4000/api/${user_id}/trips`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(values)
            })
            const data = await response.json();
            console.log(data);    
           
            } 
            const getCoordinates = async (event) => {
                event.preventDefault();
                const form = event.target;
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
 };
    return(
        <div>
            <Header />
            <h1>New trip</h1>
            <div className="reminder">
                <p>You must fill all mandatory fields.</p>
            </div>
                <form id="trips" onSubmit={onSubmit}>
                    <label>Date</label>
                    <input type="date" name="date" placeholder="Select a date"/>
                    <label>Destination</label>
                    <input type="text" name="destination" placeholder="Choose the place..."/>
                    <label>Description</label>
                    <input type="text" name="description" placeholder="How was the trip" onChange={getCoordinates}/>
                    <label>Days</label>
                    <input type="number" name="days" placeholder="How many days?" min="1"/>
                    <label>Rating</label>
                    <input type="number" name="rating" placeholder="Rating" min="1" max="5"/>
                    navigator.geolocation.getCurrentPosition(function(destination)
                    <label>Lat</label>
                    <input value={destination.coords.latitude} type="number" name="latitude" placeholder="lat" readOnly/>
                    <label>Long</label>
                    <input value={destination.coords.longitude} type="number" name="longitude" placeholder="long" readOnly/>
                    )
                    <button id="cancel-btn" className="cancel" type="cancel">Cancel</button>
                    <button id="btn" className = "buttons" type="submit" name="submit">Create</button>
                </form>
            <Footer />
        </div>   
    )
}