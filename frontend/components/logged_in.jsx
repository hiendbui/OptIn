import React from "react";
import NavBar from './nav_bar/nav_bar';
import NewsFeedContainer from './news_feed/news_feed_container';
import { Switch } from "react-router-dom";
import { LoggedInAuthRoute  } from '../util/route_util';
import Test from './nav_bar/test';



const LoggedIn = () => (
    <div>
        <NavBar />
        <Switch>
            <LoggedInAuthRoute path="/test" component={Test} />
            <LoggedInAuthRoute path="/feed" component={NewsFeedContainer} />
        </Switch>
    </div>
);

export default LoggedIn;