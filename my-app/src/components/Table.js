import React,{useState} from 'react'
import { RiPencilFill } from 'react-icons/ri';
import {MdDelete} from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const Table = ({data}) => {    
    const navigate = useNavigate();
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
  return (
    <div>
        <table>
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
                    {data.length? data.map((item, index) => (
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
                    )) : <></>}
                </tbody>
            </table>         
    </div>
  )
}

export default Table