import Header from '../components/Header.js';
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
     <div>
       <Header />
         <div className="container">  
          <div className="box">
            <h1>Login</h1>
              <div className='form-container'>
                <form  onSubmit={onSubmit}>                  
                    <label htmlFor='email'>Email</label>
                    <input type="email" className='input' id="email" name="email" placeholder="Choose your username" required/>                  
                    <label htmlFor="password">Password:</label>
                    <input type="password" className='input' id="password" name="password" placeholder="Choose your password" required/>
                    <p className='input'>You're not a user yet? <Link to={"/"}>Sign up</Link></p>
                    <button  type="submit" id="form-button" name="submit">Enter</button>
                    {error?<p>Username or password invalid!</p>:null}                  
                </form>
              </div>
            </div>
        </div> 
           <Footer />     
      </div>
    );
  
}