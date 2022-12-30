import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function SettingsProfile(){
  const [email_error,setEmailError] = React.useState(null);
  const [password_error,setPasswordError] = React.useState(null);
  // const [passwordLoggedIn,setPassword] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(()=>{
   const checkUser = window.localStorage.getItem("user_id")
   console.log("check user",checkUser)
   if(!checkUser){
    navigate("/log-in")
   }
   
   },[])
  const saveEmail = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const user_id = Number(window.localStorage.getItem("user_id"));
    const value = {email};

    const response = await fetch(`http://localhost:4000/api/users/${user_id}`, {
          method: 'PUT', headers: {
              'Content-Type': 'application/json; charset=utf-8 '
          }, body: JSON.stringify(value)
      })
      const data = await response.json();
      if(response.ok) {
        window.alert("The email was saved!");
      }
      else { 
          setEmailError(data);
      }
}
  const savePassword = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const current_password = formData.get("current-password");
    const password = formData.get("new-password");
    const user_id = Number(window.localStorage.getItem("user_id"));
    const value = {password};
    const response = await fetch(`http://localhost:4000/api/users/${user_id}`);
    const passwordLoggedIn = await response.json();
    console.log(passwordLoggedIn);

    if(current_password === passwordLoggedIn && password !== current_password) {

      const response = await fetch(`http://localhost:4000/api/users/${user_id}`, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json; charset=utf-8 '
            }, body: JSON.stringify(value)
        })
    
      const data = await response.json();
      if(response.ok) {
        window.alert("The new password was saved successfully!");
        console.log(data)
        setPasswordError(null);
        form.reset();
      }
      else { 
          setPasswordError(data);
      }
    }
    else if (current_password === passwordLoggedIn && password === current_password) {
      setPasswordError(`The password you put is the same as the old one. Please try again!`)
    }
    else {
      setPasswordError(`This is not your current password. Please enter it again!`)
    }
  };
  return (
    <div>
      <Header />
        <div className="container">  
        <div className="personal-info">
          <h2>Personal Information</h2>
            <div className='form-container'>
              <form  onSubmit={saveEmail}>                  
                  <label htmlFor='email'>Email</label>
                  <input type="email" className='input' id="email" name="email" placeholder="Insert your email" required/>   
                  <button type="submit" id="form-button"  name="save">Save</button>  
                  {email_error?<p>The email is invalid! Please try again!</p>:null}       
              </form>
              <h2>Security</h2>
              <form  onSubmit={savePassword}>                              
                  <label htmlFor="password">Password</label>
                  <input type="password" className='input' id="currentpassword" name="current-password" placeholder="Insert current password" required/>
                  <input type="password" className='input' id="newpassword" name="new-password" placeholder="Insert new password" pattern="(?=.*\d)(?=.*[!?.:]).{5,20}" title="Must contain at least one number and one special character, and 5-20 characters"/>
                  <button  type="submit" id="form-button" name="save">Save</button>
                  {password_error?<p>{password_error} </p>:null}                  
              </form>
            </div>
          </div>
      </div> 
          <Footer />     
    </div>
  );

}