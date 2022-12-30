import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function SettingsProfile(){
      const [error,setError] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(()=>{
   const checkUser = window.localStorage.getItem("user_id")
   console.log("check user",checkUser)
   if(!checkUser){
    navigate("/log-in")
   }
   
   },[])
   const onSubmit = async (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const formData = new FormData(form);
//     const email = formData.get("email");
//     const password = formData.get("password");
//     const user_id = Number(window.localStorage.getItem("user_id"));
//     const values = {user_id, email, password };
  
// const response = await fetch(`http://localhost:4000/api/users/${user_id}`, {
//         method: 'PUT', headers: {
//             'Content-Type': 'application/json; charset=utf-8 '
//         }, body: JSON.stringify(values)
//     })
//     const data = await response.json();
//     if(response.ok) {
//         //logic
//     }
//     else { 
//         setError(data);
//     }
  };
    return (
     <div>
       <Header />
         <div className="container">  
          <div className="personal-info">
            <h2>Personal Information</h2>
              <div className='form-container'>
                <form  onSubmit={onSubmit}>  
                <div>              
                    <label htmlFor='email'>Email</label>
                    <input type="email" className='input' id="email" name="email" placeholder="Insert your email" required/>   
                    </div> 
                     <button type="button" id="form-button"  name="save">Save</button>       
                </form>
                <h2>Security</h2>
                <form  onSubmit={onSubmit}>  
                <div>                           
                <div className='passChange'>
                    <label htmlFor="password">Password</label>
                    <input type="password" className='input' id="currentpassword" name="current_password" placeholder="Insert current password" required/>
                    <div>
                    <input type="password" className='input' id="newpassword" name="password" placeholder="Insert new password" required/>
                    </div>
                    </div>
                    </div>
                    <button  type="button" id="form-button" name="save">Save</button>
                    {error?<p>Username or password invalid!</p>:null}                  
                </form>
              </div>
            </div>
        </div> 
           <Footer />     
      </div>
    );
  
}