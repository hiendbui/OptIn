import React from "react";
import Greeting from "./greeting/greeting";
import LoginFormContainer from "./session_form/login_form_container";
import SignUpFormContainer from "./session_form/signup_form_container";
import { Switch } from "react-router-dom";
import { LoggedInAuthRoute, LoggedOutAuthRoute } from '../util/route_util';
import NavBarContainer from './nav_bar/nav_bar_container'
import NewsFeedContainer from './news_feed/news_feed_container';
import ProfileContainer from './profile/profile_container';
import NetworkContainer from './network/network_container';
import JobsFeedContainer from './jobs/jobs_feed_container';



const App = () => (
    <div className='app'>  
        <LoggedInAuthRoute component={NavBarContainer} />
        <Switch>
            <LoggedOutAuthRoute exact path="/login" component={LoginFormContainer} />
            <LoggedOutAuthRoute exact path="/signup" component={SignUpFormContainer} />
            <LoggedOutAuthRoute exact path='/' component={Greeting} /> 
            <LoggedInAuthRoute exact path="/feed" component={NewsFeedContainer} />
            <LoggedInAuthRoute exact path="/myNetwork" component={NetworkContainer} />
            <LoggedInAuthRoute exact path="/jobs" component={JobsFeedContainer} />
            <LoggedInAuthRoute exact path="/in/:fullNameprofileId" component={ProfileContainer} />
        </Switch>  
        
    </div>
);

export default App;