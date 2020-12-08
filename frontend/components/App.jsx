import React from "react";
import GreetingContainer from "./greeting/greeting_container";
import LoginFormContainer from "./session_form/login_form_container";
import SignUpFormContainer from "./session_form/signup_form_container";
import { Route, Switch } from "react-router-dom";



const App = () => (
    <div>
        <Switch>
            <Route path="/login" component={LoginFormContainer} />
            <Route path="/signup" component={SignUpFormContainer} />
            <Route to='/' component={GreetingContainer}></Route> 
        </Switch>
    </div>
);

export default App;