import Header from "../components/Header.js";
import Footer from '../components/Footer.js';
import React from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css";

export default function UpdateTrip(){
    const [coordinates, setCoordinates] = React.useState([]);
    const navigate = useNavigate();
    const onSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const user_id = Number(window.localStorage.getItem("user_id"));
        const trip_id = Number(window.localStorage.getItem("trip_id"));
        const date = formData.get("date");
        const destination = formData.get("destination");
        const days = formData.get("days");
        const rating = formData.get("rating");
        const values = { date, destination, days, rating, user_id};
        const response = await fetch(`http://localhost:4000/api/trips/${trip_id}`, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(values)
        })
        const data = await response.json();
        console.log(data);
        window.alert('The trip was updated!');
        navigate('/trips');
};
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
            <div className="w-11/2 h-screen  justify-center items-center flex">
                <div className="box-flex">                    
                    <h2 className="text-center">Update #{window.localStorage.getItem("trip_id")}</h2>
                    <div className="flex flex-col gap-2 justify-center items-center ">
                        <form id="trips" onSubmit={onSubmit}>
                            <label className="mr-64">Date *</label>
                            <input className='w-full' type="date" defaultValue={window.localStorage.getItem("date")} name="date" placeholder="Select a date" required/>
                            <label className="mr-56">Destination *</label>
                            <input className='w-full' type="text" defaultValue={window.localStorage.getItem("destination")} name="destination" placeholder="Choose the place..." onChange={putCoordinates} required/>
                            <label className="mr-56">Description *</label>
                            <textarea type=""  defaultValue={window.localStorage.getItem("description")} name="description"  aria-setsize={100}  placeholder="How was the trip" required/>
                            <div className="flex gap-2"> 
                                <div>
                                    <label >Days *</label>
                                    <input type="text" defaultValue={window.localStorage.getItem("days")} name="days" placeholder="How many days?" min="1" required/>
                                </div>
                                <div>
                                    <label >Rating *</label>
                                    <input type="text" defaultValue={window.localStorage.getItem("rating")} name="rating" placeholder="Rating" min="1" max="5" required/>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <div>
                                    <label >Lat *</label>
                                    <input value={coordinates[0]} type="text" name="latitude" placeholder="lat" readOnly/>
                                </div>
                                <div>
                                    <label >Long *</label>
                                    <input value={coordinates[1]} type="text" name="longitude" placeholder="long" readOnly/>
                                </div>
                            </div>
                            <div className="flex w-full gap-2">
                                <button className="w-full h-10 bg-[#f5f5f5f5] text-black rounded-md text-lg"  type="cancel">Cancel</button>
                                <button  className="w-full h-10 bg-black rounded-md text-lg" type="submit" name="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>   
    )
}