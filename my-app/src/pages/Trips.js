import Header from "../components/Header.js";
import Footer from '../components/Footer.js';
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";
import { RiPencilFill } from 'react-icons/ri';
import {MdDelete} from 'react-icons/md';

export default function Trips(){
    const [table, setTable] = React.useState([]);
    const navigate = useNavigate();
    React.useEffect(()=>{
        const checkUser = window.localStorage.getItem("user_id")
        console.log("check user",checkUser)
        if(!checkUser){
         navigate("/log-in")
        }
       },[])
async function showTrips() {
    const user_id = Number(window.localStorage.getItem("user_id"));
    const response = await fetch(`http://localhost:4000/api/${user_id}/trips`);
    const data = await response.json();
    setTable(data);      
}   

async function onUpdate(event) {
    const update_id = event.currentTarget.id; 
    window.localStorage.setItem("trip_id", update_id);
    navigate('/update-trip');
}

async function onDelete(event) {
    const delete_id = event.currentTarget.id; 
    await fetch(`http://localhost:4000/api/trips/${delete_id}`, {
        method: 'DELETE'
    })
    window.alert("Trip deleted!");
}

React.useEffect(() =>{
 showTrips();   

},[] )

function gotoCreateTrip(){
    navigate("/create-new-trip");
}


    return(
        <div>
            <Header />
            <div id="container">
            <p>My trips</p>
            <button type="button" id="newTrip" onClick={gotoCreateTrip}>New trip</button>
            <table id="table">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Destination</th>
                    <th>Days</th>
                    <th>Rating</th>
                    <th>UserID</th>
                    <th>Update trips</th>
                    <th>Delete trips</th>
                    </tr>
                    {table.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.date}</td>
                            <td>{item.destination}</td>
                            <td>{item.days}</td>
                            <td>{item.rating}</td>
                            <td>{item.userID}</td>
                            <td>< RiPencilFill size ={18} onClick={onUpdate} id={item.id}/></td>
                            <td>< MdDelete size={18}  onClick={onDelete} id={item.id} /></td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <Footer />
        </div>   
    )
}