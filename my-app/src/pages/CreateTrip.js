import Header from "../components/Header.js";
import Footer from '../components/Footer.js';
import React,{useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css";

export default function CreateTrip() {
    const navigate = useNavigate();
    const [coordinates, setCoordinates] = useState([]);
    const userId = Number(window.localStorage.getItem("user_id"))
    const [formData, setFormData] = useState({user_id:userId,date:'',destination:'',days:'',rating:'',description:''})

        useEffect(()=>{
        const checkUser = window.localStorage.getItem("user_id")
        console.log("check user",checkUser)
        if(!checkUser){
         navigate("/log-in")
        }
        },[])       

        const onSubmit = async (e) =>{
            e.preventDefault()
            const response = await fetch(`http://localhost:4000/api/${userId}/trips`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json'
                }, body: JSON.stringify(formData)
            })
            const data = await response.json();
            console.log(formData)
        }
        const putCoordinates = async (destination) => {           
            
  
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

    useEffect(()=>{
           putCoordinates(formData.destination) 
    },[formData.destination])
    
    return(
        <div>
            <Header />
            <h1 className="newtrip">New trip</h1>
            <div className="reminder">
            <div>You must fill all the mandatory list</div>
            </div>
                <form id="trips" onSubmit={onSubmit}>
                    <div className="box">
                    <label>Date *</label>
                    <input className="input" type="date" name="date"  placeholder="Select a date" onChange={(e)=>setFormData({...formData,date:e.target.value})}/>
                    <label>Destination *</label>
                    <input  className="input" type="text" name="destination" placeholder="Choose the place..." onChange={(e)=>setFormData({...formData,destination:e.target.value})}/>
                    <label>Description *</label>
                    <textarea type="" name="description"  aria-setsize={100}  placeholder="How was the trip" onChange={(e)=>setFormData({...formData,description:e.target.value})}/>
                    <div className="row">
                        <div className="column">
                    <label>Days *</label>
                    <input  type="number" name="days" placeholder="How many days?" min="1" onChange={(e)=>setFormData({...formData,days:e.target.value})}/>
                    </div>
                    <div className="column">
                    <label>Rating *</label>
                    <input  type="number" name="rating" placeholder="Rating" min="1" max="5" onChange={(e)=>setFormData({...formData,rating:e.target.value})}/>
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
                    <div className="buttonCancle">
                    <button id="cancel-btn" className="cancel" type="cancel">Cancel</button>
                    </div>
                      <div className="buttonCreate" > 
                    <button  className = "w-20 h-10 bg-black text-white" type="submit" name="submit" onClick={onSubmit} >Create</button>
                 </div>
                 </div>
                
                </form>
            <Footer />
        </div>   
    )
}