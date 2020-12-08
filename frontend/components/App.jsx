import React from "react";
import GreetingContainer from "./greeting/greeting_container"
import { Route } from "react-router-dom";



const App = () => (
    <div>
        <Route to='/' component={GreetingContainer}></Route> 
    </div>
);

export default App;