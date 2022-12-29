import Header from "../components/Header.js";
import Footer from '../components/Footer.js';
import React from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css";

export default function CreateTrip() {
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
        const putCoordinates = async (event) => {
                
            const destination = event.target.value;
  
                const response_des = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
              );
            const data_des= await response_des.json();   
            if (data_des.length > 0) {
            const trip = [
                data_des[0].lat,
                data_des[0].lon,
            ];
            console.log(data_des);
            const nextState = trip;
            setCoordinates(nextState);
            
        };
    }
    return(
        <div>
            <Header />
            <h1>New trip</h1>
            <div className="reminder">
                <p>You must fill all mandatory fields.</p>
            </div>
                <form id="trips" onSubmit={onSubmit}>
                    <label>Date * </label>
                    <input type="date" name="date" placeholder="Select a date"/>
                    <label>Destination *</label>
                    <input type="text" name="destination" placeholder="Choose the place..." onChange={putCoordinates}/>
                    <label>Description *</label>
                    <input type="text" name="description" placeholder="How was the trip"/>
                    <div className="row">
                        <div className="column">
                    <label>Days *</label>
                    <input type="number" name="days" placeholder="How many days?" min="1"/>
                    </div>
                    <div className="column">
                    <label>Rating *</label>
                    <input type="number" name="rating" placeholder="Rating" min="1" max="5"/>
                    </div>
                    </div>
                    <div className="row">
                        <div className="column">
                        <label>Lat *</label>
                    <input value={coordinates[0]} type="text" name="latitude" placeholder="lat" readOnly/>
                    </div>
                    <div className="column">
                    <label>Long *</label>
                    <input value={coordinates[1]} type="text" name="longitude" placeholder="long" readOnly/>
                    </div>
                    </div>
                    <div className="buttonTrips">
                        <div className="buttonCol">
                    <button id="cancel-btn" className="cancel" type="cancel">Cancel</button>
                    </div>
                    </div>
                    <div className="buttonTrips">
                        <div className="buttonCol">
                    <button id="btn" className = "buttons" type="submit" name="submit">Create</button>
                 </div>
                 </div>
                </form>
            <Footer />
        </div>   
    )
}