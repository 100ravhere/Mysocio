import React from "react";
import Signup from "./Components/Signup";

import {AuthProvider} from "./Contexts/AuthContext"

import Login from "./Components/Login";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route} from "react-router-dom";
import PrivateRoute from "./Components/privateRoute"
import ForgotPassword from "./Components/ForgotPassword"
import UpdateProfile from "./Components/UpdateProfile"

import './App.css'
const  App =() => {
 

  return (
    <div>
      
    <Router>
     <AuthProvider>


     <PrivateRoute exact path="/home"  component ={Home} />
     <PrivateRoute exact path="/update-profile" component ={UpdateProfile} />
<Route path="/signup" exact component={Signup} />

<Route path="/" exact component ={Login} />
<Route path="/forgot-password" component={ForgotPassword} />

</AuthProvider>
<div className="heading"> </div>
</Router> 
    </div>
  );
}

export default App;
