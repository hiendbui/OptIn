import React from "react";
import GreetingContainer from "./greeting/greeting_container"
import logo from '../images/optin_logo.png'

const App = () => (
    <div>
        <img src={logo} id="logo" />
        <GreetingContainer />
    </div>
);

export default App;