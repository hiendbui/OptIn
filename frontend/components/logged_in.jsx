import React from "react";
import NavBar from './nav_bar/nav_bar';
import NewsFeedContainer from './news_feed/news_feed_container';
import { Switch,Route } from "react-router-dom";
import Test from './nav_bar/test';



const LoggedIn = () => (
    <div>
        <NavBar />
        <Switch>
            <Route path="/test" component={Test} />
            <Route path="/feed" component={NewsFeedContainer} />
        </Switch>
    </div>
);

export default LoggedIn;