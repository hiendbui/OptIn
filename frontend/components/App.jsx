import React from "react";
import Greeting from "./greeting/greeting";
import LoginFormContainer from "./session_form/login_form_container";
import SignUpFormContainer from "./session_form/signup_form_container";
import  LoggedIn from './logged_in';
import { Switch } from "react-router-dom";
import { LoggedInAuthRoute, LoggedOutAuthRoute } from '../util/route_util';



const App = () => (
    <div>  
        <Switch>
            <LoggedOutAuthRoute path="/login" component={LoginFormContainer} />
            <LoggedOutAuthRoute path="/signup" component={SignUpFormContainer} />
            <LoggedOutAuthRoute path='/' component={Greeting} /> 
        </Switch>
        <LoggedInAuthRoute path='/' component={LoggedIn}/>   
    </div>
);

export default App;