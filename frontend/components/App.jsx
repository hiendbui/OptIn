import React from "react";
import GreetingContainer from "./greeting/greeting_container";
import LoginFormContainer from "./session_form/login_form_container";
import SignUpFormContainer from "./session_form/signup_form_container";
import  NewsFeed  from './news_feed/news_feed'
import { Route, Switch } from "react-router-dom";
import { LoggedInAuthRoute, LoggedOutAuthRoute } from '../util/route_util';



const App = () => (
    <div>
        <Switch>
            <LoggedInAuthRoute path="/feed" component={NewsFeed} />
            <LoggedOutAuthRoute path="/login" component={LoginFormContainer} />
            <LoggedOutAuthRoute path="/signup" component={SignUpFormContainer} />
            <LoggedOutAuthRoute path='/' component={GreetingContainer} /> 
        </Switch>
    </div>
);

export default App;