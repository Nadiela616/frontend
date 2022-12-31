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
         const nextState = trip;
        setCoordinates(nextState);
        
    };
 }
    return(
        <div className='bg-[#F5F5F5]'>
            <Header />
            <div className=" h-screen  justify-center items-center flex">
                <div className="bg-white w-[800px] text-sm  rounded-2xl  flex flex-col justify- items-center py-6">                    
                    <h2 className="text-center mt-8">Update #{window.localStorage.getItem("trip_id")}</h2>
                    <div className="flex flex-col w-3/4  justify-center items-center ">
                        <form  onSubmit={onSubmit}>
                            <label className="mr-64 ">Date *</label>
                            <input className='w-full h-10 ' type="date" defaultValue={window.localStorage.getItem("date")} name="date" placeholder="Select a date" required/>
                            <label className="mr-56 mt-2">Destination *</label>
                            <input className='w-full h-10' type="text" defaultValue={window.localStorage.getItem("destination")} name="destination" placeholder="Choose the place..." onChange={putCoordinates} required/>
                            <label className="mr-56 mt-2">Description *</label>
                            <div className="">
                                <textarea type="text" className="w-full mt-2 h-30"  defaultValue={window.localStorage.getItem("description")} name="description" aria-setsize={100}   placeholder="How was the trip" required/>
                            </div>
                            <div className="flex mt-4 gap-2"> 
                                <div>
                                    <label >Days *</label>
                                    <input type="text" className=" ml-3 h-10" defaultValue={window.localStorage.getItem("days")} name="days" placeholder="How many days?" min="1" required/>
                                </div>
                                <div>
                                    <label >Rating *</label>
                                    <input type="text" className=" ml-3 h-10" defaultValue={window.localStorage.getItem("rating")} name="rating" placeholder="Rating" min="1" max="5" required/>
                                </div>
                            </div>
                            <div className="flex mt-2 gap-2">
                                <div>
                                    <label >Lat *</label>
                                    <input value={coordinates[0]} className=" ml-3 h-10" type="text" name="latitude" placeholder="lat" readOnly/>
                                </div>
                                <div>
                                    <label >Long *</label>
                                    <input value={coordinates[1]} className=" ml-3 h-10" type="text" name="longitude" placeholder="long" readOnly/>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4 pb-8 w-full gap-2">
                                <button className="w-20 h-10 bg-[#f5f5f5f5] text-black rounded-md text-lg"  type="cancel">Cancel</button>
                                <button  className="w-60 h-10 bg-black rounded-md text-lg" type="submit" name="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>   
    )
}