import React from "react";
import NavBarContainer from './nav_bar/nav_bar_container';
import NewsFeedContainer from './news_feed/news_feed_container';
import { Switch,Route } from "react-router-dom";
import ProfileContainer from './profile/profile_container'



const LoggedIn = () => (
    <div>
        <NavBarContainer />
        <div id='gap'></div>
        <Switch>
            <Route path="/in/:fullNameuserId" component={ProfileContainer} /> 
            {/* :fullNameuserId refers to user's fullname + userId (no spaces)*/}
            <Route path="/feed" component={NewsFeedContainer} />
        </Switch>
    </div>
);

export default LoggedIn;