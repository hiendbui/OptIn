import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';


const LoggedInAuth = ({ component: Component, path, loggedIn, exact }) => (
    <Route
        path={path}
        exact={exact}
        render={props => 
            loggedIn ? <Component {...props} /> : <Redirect to="/" />
        }
    />
);

const LoggedOutAuth = ({ component: Component, path, loggedIn, exact }) => (
    <Route
        path={path}
        exact={exact}
        render={props => 
            loggedIn  ? <Redirect to="/feed"/> : <Component {...props} />
        }
    />
);

const mapStateToProps = state => ({
    loggedIn: Boolean(state.session.id)
});

export const LoggedInAuthRoute = withRouter(connect(mapStateToProps)(LoggedInAuth));
export const LoggedOutAuthRoute = withRouter(connect(mapStateToProps)(LoggedOutAuth));