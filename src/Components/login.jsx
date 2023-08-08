import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { useState,useEffect } from "react";

import './login.css';

const Login = () =>
{

    const [emailid,setEmailid]=useState("");
    const [password,setPassword]=useState("");

    const FetchLoginDetails = async (emailid) => {
      const requestoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
    
      try {
        const response = await fetch(`https://localhost:7061/api/Registration/login?emailid=${emailid}&password=${password}`, requestoptions);
    
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log(data);
          } else {
            const data = await response.text();
            console.log(data); // This will log the plain text response
            alert(data);
          }
        } else if (response.status === 409) {
          // Handle email exists
        } else if (response.status === 400) {
          // Handle validation error
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    
    
    const handlechange= (event) =>{
       setEmailid(event.target.value);
    };

    const handlechangePassword= (event) =>{
      setPassword(event.target.value);
   };
    
      
      
    const SigninButton = () =>{
        console.clear();
        FetchLoginDetails(emailid);
      }

    return(
        <div>
        <img src="./loginbackgroundimage.avif" className="loginbackgroundimage"/>
       <div className="LoginPage">

            <div className="logincontainer">
            <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                    <input 
                       type="text"
                        class="form-control" 
                        id="staticEmail" 
                        value={emailid} 
                        onChange={handlechange} />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword"
                        value={password}
                        onChange={handlechangePassword}/>
                    </div>
                </div>
                <button class="btn btn-primary" type="submit" onClick={SigninButton}>Sign In</button>
        </div>
       </div>
       </div>
    );
};

export default Login;