import Navbar from '../components/Navbar';
import Footer from '../components/Footer.js';
import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function LogIn(){
  const [error,setError] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(()=>{
   const checkUser = window.localStorage.getItem("user_id")
   console.log("check user",checkUser)
   if(checkUser){
    navigate("/trips")
   }
   
  },[])
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const values = { email, password };
  
    const response = await fetch('http://localhost:4000/api/log-in', {
        method: 'POST', headers: {
            'Content-Type': 'application/json; charset=utf-8 '
        }, body: JSON.stringify(values)
    })
    const data = await response.json();
    if(response.ok) {
        const user_id = data.id;
        window.localStorage.setItem("user_id", user_id);
        navigate('/trips')
        console.log(data);
    }
    else { 
        setError(data);
    }
  };
    return (
     <div className='bg-[#F5F5F5]'>
       <Navbar />
         <div className=" h-screen justify-center items-center flex ">  
          <div className="box-flex ">
            <h1 className='text-center'>Login</h1>
              <div className='flex flex-col justify-center w-3/4   items-center'>
                <div className='pt-10 w-1/2' >
                  <form  onSubmit={onSubmit}>                  
                      <label htmlFor='email' className='mr-56'>Email</label>
                      <input type="email" className='w-full h-10' id="email" name="email" placeholder="Choose your email" required/>                  
                      <label htmlFor="password" className='mr-56'>Password</label>
                      <input type="password" className='w-full h-10' id="password" name="password" placeholder="Choose your password" required/>
                      <p className='w-full lg:ml-8'>You're not a user yet? <Link to={"/"}>Sign up</Link></p>
                      {error?<p>Username or password invalid!</p>:null}                  
                      <button  type="submit" className='w-full h-10 bg-black rounded-md text-lg' name="submit">Enter</button>
                  </form>
                </div>
              </div>
            </div>
        </div> 
           <Footer />     
      </div>
    );
  
}