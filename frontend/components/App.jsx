import React from "react";
import Greeting from "./greeting/greeting";
import LoginFormContainer from "./session_form/login_form_container";
import SignUpFormContainer from "./session_form/signup_form_container";
import  LoggedIn from './logged_in';
import { Switch } from "react-router-dom";
import { LoggedInAuthRoute, LoggedOutAuthRoute } from '../util/route_util';
import NavBarContainer from './nav_bar/nav_bar_container'
import NewsFeedContainer from './news_feed/news_feed_container';
import ProfileContainer from './profile/profile_container';



const App = () => (
    <div>  
        <LoggedInAuthRoute component={NavBarContainer} />
        <Switch>
            <LoggedInAuthRoute path="/in/feed" component={NewsFeedContainer} />
            <LoggedInAuthRoute path="/in/:fullNameuserId" component={ProfileContainer} />
            <LoggedOutAuthRoute path="/login" component={LoginFormContainer} />
            <LoggedOutAuthRoute path="/signup" component={SignUpFormContainer} />
            <LoggedOutAuthRoute path='/' component={Greeting} /> 
        </Switch>   
    </div>
);

export default App;