import Header from "../components/Header.js";
import Footer from '../components/Footer.js';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";
import { FiMap } from 'react-icons/fi'
import { HiOutlineTableCells } from 'react-icons/hi2'
import Table from "../components/Table.js";

export default function Trips() {

    const navigate = useNavigate()
    const [data, setData] = useState([])
        useEffect(()=>{
            const checkUser = window.localStorage.getItem("user_id")
            console.log("check user",checkUser)
            if(!checkUser){
             navigate("/log-in")
            }
           },[])

    async function showTrips() {
        const user_id = Number(window.localStorage.getItem("user_id"));
        try {
            const response = await fetch(`http://localhost:4000/api/${user_id}/trips`);
            const data = await response.json();
            setData(data);  
        } catch (error) {
            console.log(error)
        }
            
    }   



    useEffect(() =>{
     showTrips(); 
    },[] )

    


    return (
        <div className="bg-[#f5f5f5]">
            <Header />
            <div className="w-full  flex justify-center mt-10  h-screen">
                <div className=" flex justify-center  w-11/12 h-screen">
                    <div>
                        <div className="  flex gap-6 justify-center h-10 mt-10">
                            <div className="flex rounded-lg justify-center gap-2 p-6  items-center bg-white">
                                <div className="mb-2">
                                    <FiMap size={20} />
                                </div>
                                <h3 className="text-sm">Maps</h3>
                            </div>
                            <div className="flex rounded-lg justify-center gap-2 p-6 items-center hover:bg-stone-800 bg-[#2B2B2B] text-white">
                                <div className="mb-2">
                                    <HiOutlineTableCells size={25} />
                                </div>
                                <h3 className="text-sm">Tables</h3>
                            </div>
                        </div>
                        <div className="mt-20 flex gap-[50rem]">
                            <h3>My Trips</h3>
                            <button className="w-20 h-12 bg-[#FF6969] text-white rounded-xl hover:bg-[#FF6960]" onClick={() =>navigate('/create-new-trip')} >New Trip</button>
                        </div>
                        <div className="mt-5">
                            <Table data={data} />
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


