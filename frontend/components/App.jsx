import React from "react";
import Greeting from "./greeting/greeting";
import LoginFormContainer from "./session_form/login_form_container";
import SignUpFormContainer from "./session_form/signup_form_container";
import  NewsFeedContainer  from './news_feed/news_feed_container';
import { Switch } from "react-router-dom";
import { LoggedInAuthRoute, LoggedOutAuthRoute } from '../util/route_util';



const App = () => (
    <div>
        <Switch>
            <LoggedInAuthRoute path="/feed" component={NewsFeedContainer} />
            <LoggedOutAuthRoute path="/login" component={LoginFormContainer} />
            <LoggedOutAuthRoute path="/signup" component={SignUpFormContainer} />
            <LoggedOutAuthRoute path='/' component={Greeting} /> 
        </Switch>
    </div>
);

export default App;