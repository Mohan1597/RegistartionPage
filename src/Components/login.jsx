import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { useState,useEffect } from "react";

import './login.css';

const Login = () =>
{

    const [emailid,setEmailid]=useState("balaya@gmail.com");

    const FetchLoginDetails = async () => {
        const requestoptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }, // Update Content-Type
          body: JSON.stringify({
            emailid: emailid,
          }),
        };
      
        try {
          const response = await fetch(`https://localhost:7061/api/Registration/login`, requestoptions);
      
          if (response.ok) {
            const data = await response.json();
            console.log(data);
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
      
      
           useEffect(() => {
              FetchLoginDetails();
          }, []); 
    return(
        <div>
        <img src="./loginbackgroundimage.avif" className="loginbackgroundimage"/>
       <div className="LoginPage">

            <div className="logincontainer">
            <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                    <input type="text" class="form-control" id="staticEmail" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                    <input type="password" class="form-control" id="inputPassword"/>
                    </div>
                </div>
                <button class="btn btn-primary" type="submit">Sign In</button>
        </div>
       </div>
       </div>
    );
};

export default Login;