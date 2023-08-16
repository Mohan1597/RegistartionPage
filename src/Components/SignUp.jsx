import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { useState,useEffect } from "react";

import './SignUp.css';

import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const [emailid,setEmailid]=useState("");
    const [name,setName]=useState("");
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
    
    const handlechangeName= (event) =>{
        setName(event.target.value);
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

    const navigate = useNavigate();

    const signupbutton = () =>{
      navigate('/signup');
    };


  return (
    <div>
        <img src="./loginbackgroundimage.avif" className="loginbackgroundimage"/>
       <div className="SignUpPage">

            <div className="logincontainer">
            <div class="mb-3 row center fw-bold">
                    Create an Account
                </div>
                <div class="mb-3 row">
                    <label for="Name" class="col-form-label">Name</label>
                    <div >
                    <input 
                       type="text"
                        class="form-control" 
                        id="staticEmail" 
                        value={name} 
                        onChange={handlechangeName} />
                    </div>
                </div>
            <div class="mb-3 row">
                    <label for="staticEmail" class="col-form-label">Email</label>
                    <div >
                    <input 
                       type="text"
                        class="form-control" 
                        id="staticEmail" 
                        value={emailid} 
                        onChange={handlechange} />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-form-label">Password</label>
                    <div >
                    <input type="password" class="form-control" id="inputPassword"
                        value={password}
                        onChange={handlechangePassword}/>
                    </div>
                </div>
                <button class=" mb-3 btn btn-primary" type="submit" onClick={SigninButton}>Sign Up</button>
                {/* <div class="mb-3 row center "  role="button" tabindex="0" onClick={signupbutton}>
                    Didn't have an account?  SignUp?
                </div> */}
                <div class="alert alert-primary" role="alert">
                   Already have an account? <a href="/" class="alert-link">signin</a>
               </div>
        </div>
       </div>
       </div>
  )
}

export default SignUp