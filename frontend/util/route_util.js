import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

const LoggedInAuth = ({ component: Component, path, loggedIn, exact, hasProfile }) => (
    <Route
        path={path}
        exact={exact}
        render={props =>
            loggedIn && hasProfile ? <Component {...props} /> : <Redirect to="/" />
        }
    />
);

const LoggedOutAuth = ({ component: Component, path, loggedIn, exact, hasProfile }) => (
    <Route
        path={path}
        exact={exact}
        render={props =>
            loggedIn  && hasProfile ? <Redirect to="/feed" /> : <Component {...props} />
        }
    />
);

const mapStateToProps = state => ({
    loggedIn: Boolean(state.session.id),
    hasProfile: state.entities.users[state.session.id] ? state.entities.users[state.session.id].profile : false
});

export const LoggedInAuthRoute = withRouter(connect(mapStateToProps)(LoggedInAuth));
export const LoggedOutAuthRoute = withRouter(connect(mapStateToProps)(LoggedOutAuth));