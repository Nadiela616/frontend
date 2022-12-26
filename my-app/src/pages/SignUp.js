import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import React from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function SignUp(){
     const [error,setError] = React.useState(null);
     React.useEffect(()=>{
        const checkUser = window.localStorage.getItem("user_id")
        console.log("check user", checkUser)
        if(checkUser){
         navigate("/trips")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
       },[])
     const navigate = useNavigate();
     const onSubmit = async (event) => {
       event.preventDefault();
       const form = event.target;
       const formData = new FormData(form);
       const email = formData.get("email");
       const password = formData.get("password");
       const values = { email, password };
     
       const response = await fetch('http://localhost:4000/api/sign-up', {
           method: 'POST', headers: {
               'Content-Type': 'application/json; charset=utf-8 '
           }, body: JSON.stringify(values)
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
        <div className="app-title">
           <Header />
           <h1>Sign up</h1>
            <form id="signup" onSubmit={onSubmit}>
                <label htmlFor="email">Email*</label>
                <input type="email" id="email" name="email" placeholder="Choose your email" minLength="5" maxLength="20"  required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Choose your password" pattern="(?=.*\d)(?=.*[!?.:]).{5,20}" title="Must contain at least one number and one special character, and 5-20 characters"/> 
                <p>Are you already a user? <Link to={"/log-in"}>Login</Link></p>
                <button type="submit" className="button_submit" name="submit">Create account</button>
                {error?<p>Username or password invalid!</p>:null}
           </form>
           <Footer />
        </div>

    
    );      
};