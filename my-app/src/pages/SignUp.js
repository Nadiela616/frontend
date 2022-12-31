import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function SignUp(){
     const [error,setError] = useState(null);
     const [formData,setFormData] = useState({email:'',password:''})
     useEffect(()=>{
        const checkUser = window.localStorage.getItem("user_id")
        console.log("check user", checkUser)
        if(checkUser){
         navigate("/trips")
        }
        
       },[])
     const navigate = useNavigate();

     const onSubmit = async (event) => {
       event.preventDefault();
    //    const form = event.target;
    //    const formData = new FormData(form);
    //    const email = formData.get("email");
    //    const password = formData.get("password");
    //    const values = { email, password };
     
       const response = await fetch('http://localhost:4000/api/sign-up', {
           method: 'POST', headers: {
               'Content-Type': 'application/json; charset=utf-8 '
           }, body: JSON.stringify(formData)
       })
       const data = await response.json();
       if(response.ok) {
            window.alert("Account created");
            navigate('/log-in');
            console.log(data);  
       }
       else {
            setError(data);
       }
    }
    return (
        <div className='bg-[#F5F5F5]'>
           <Navbar />
           <div className=" h-screen  justify-center items-center flex">
            <div className="box-flex">
           <h1 className='text-center'>Sign up</h1>          
           <div className='flex flex-col justify-center w-3/4  items-center'>
            <div className='pt-10 w-1/2'>
            <form  onSubmit={onSubmit}>                  
                    <label htmlFor='email' className='mr-56'>Email*</label>
                    <input type="email" className='w-full h-10' id="email" placeholder="Choose your email" minLength="5" maxLength="20"  onChange={(e) =>setFormData({...formData,email:e.target.value})} required/>                  
                    <label htmlFor="password" className='mr-56'>Password</label>
                    <input type="password" className='w-full h-10' id="password" name="password" placeholder="Choose your password" pattern="(?=.*\d)(?=.*[!?.:]).{5,20}" title="Must contain at least one number and one special character, and 5-20 characters" onChange={(e) =>setFormData({...formData,password:e.target.value})}/>
                    <p className='w-full lg:ml-8'>Are you already a user? <Link to={"/log-in"}>Login</Link></p>
                    {error?<p>Username or password invalid!</p>:null}                  
                </form>
                    <button  type="submit" className='w-full h-10 bg-black rounded-md text-lg' name="submit" onClick={onSubmit}>Create Account</button>
            </div>                
              </div>
           </div>
           </div>
           <Footer />
        </div>

    
    );      
};