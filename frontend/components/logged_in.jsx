import React from "react";
import NavBarContainer from './nav_bar/nav_bar_container';
import NewsFeedContainer from './news_feed/news_feed_container';
import { Switch,Route } from "react-router-dom";
import Test from './nav_bar/test';



const LoggedIn = () => (
    <div>
        <NavBarContainer />
        <Switch>
            <Route path="/test" component={Test} />
            <Route path="/feed" component={NewsFeedContainer} />
        </Switch>
    </div>
);

export default LoggedIn;