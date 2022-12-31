import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function CreateTrip() {
  const navigate = useNavigate();
  const [coordinates, setCoordinates] = useState([]);
  const [countryRes,setCountryRes] = useState("")
  const userId = Number(window.localStorage.getItem("user_id"));

  const [formData, setFormData] = useState({
    user_id: userId,
    date: "",
    destination: "",
    days: "",
    rating: "",
    description: "",
    lat:'',
    lon:'',
    country:countryRes
  });

  useEffect(()=>{
  const checkUser = window.localStorage.getItem("user_id")
  if(!checkUser){
   navigate("/log-in")
  }
  },[])

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/${userId}/trips`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
  };
  const putCoordinates = async (destination) => {
    const response_des = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
    );
    const data_des = await response_des.json();
    if (data_des.length) {
      const trip = [data_des[0].lat, data_des[0].lon];  
      setCoordinates(trip);
    const str = data_des[0].display_name
    const country = str.split(',')
    setCountryRes(country[str.split(',').length-1])       
    }

  };

  useEffect(() => {
    putCoordinates(formData.destination);
   }, [formData.destination]);

   useEffect(()=>{
    let latitude= coordinates[0]
    let long = coordinates[1]   
    setFormData({...formData,lat:latitude,lon:long,country:countryRes})
   },[coordinates])

  

  return (
    <div className="bg-[#f5f5f5]">
      <Header />
      <div className="h-screen justify-center items-center  flex">
        <div className=" bg-white w-[800px] text-sm  rounded-2xl  flex flex-col justify- items-center py-6">
          <h1 className="text-center">New trip</h1>
          <div className="flex w-[300px] h-[40px] flex-row justify-center items-center text-[#FF6969]  bg-[#FFC1C1]">
            <p className="mt-3">You must fill all the mandatory list</p>
          </div>
          <div className="flex flex-col justify-center w-3/4  items-center">
            <form onSubmit={onSubmit}>
              <label className="mr-64 ">Date *</label>
              <input
                className="w-full h-10 "
                type="date"
                defaultValue={window.localStorage.getItem("date")}
                name="date"
                placeholder="Select a date"
                required
                onChange={(e) =>setFormData({...formData,date:e.target.value})}
              />
              <label className="mr-56 mt-2">Destination *</label>
              <input
                className="w-full h-10"
                type="text"
                defaultValue={window.localStorage.getItem("destination")}
                name="destination"
                placeholder="Choose the place..."
               
                required
                onChange={(e) =>setFormData({...formData,destination:e.target.value})}
              />
              <label className="mr-56 mt-2">Description *</label>
              <div className="">
                <textarea
                  type="text"
                  className="w-full mt-2 h-30"
                  defaultValue={window.localStorage.getItem("description")}
                  name="description"
                  aria-setsize={100}
                  placeholder="How was the trip"
                  required
                  onChange={(e) =>setFormData({...formData,description:e.target.value})}
                />
              </div>
              <div className="flex mt-4 gap-2">
                <div>
                  <label>Days *</label>
                  <input
                    type="text"
                    className=" ml-3 h-10"
                    defaultValue={window.localStorage.getItem("days")}
                    name="days"
                    placeholder="How many days?"
                    min="1"
                    required
                    onChange={(e) =>setFormData({...formData,days:e.target.value})}
                  />
                </div>
                <div>
                  <label>Rating *</label>
                  <input
                    type="text"
                    className=" ml-3 h-10"
                    defaultValue={window.localStorage.getItem("rating")}
                    name="rating"
                    placeholder="Rating"
                    min="1"
                    max="5"
                    required
                    onChange={(e) =>setFormData({...formData,rating:e.target.value})}
                  />
                </div>
              </div>
              <div className="flex mt-2 gap-2">
                <div>
                  <label>Lat *</label>
                  <input
                    value={coordinates[0]}
                    className=" ml-3 h-10"
                    type="text"
                    name="latitude"
                    placeholder="lat"
                    readOnly
                  />
                </div>
                <div>
                  <label>Long *</label>
                  <input
                    value={coordinates[1]}
                    className=" ml-3 h-10"
                    type="text"
                    name="longitude"
                    placeholder="long"
                    readOnly
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4 pb-8 w-full gap-2">
                <button
                  className="w-20 h-10 bg-[#f5f5f5f5] text-black rounded-md text-lg"
                  type="cancel"
                >
                  Cancel
                </button>
                <button
                  className="w-60 h-10 bg-black rounded-md text-lg"
                  type="submit"
                  name="submit"
                >
                  Create Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
