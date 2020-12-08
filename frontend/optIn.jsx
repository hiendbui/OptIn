import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from './components/root';
import * as SessionAction from './actions/session_actions'

document.addEventListener("DOMContentLoaded", () => {
    const rootEl = document.getElementById("root");
    const store = configureStore();
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.login = SessionAction.login
    window.logout = SessionAction.logout
    window.signup = SessionAction.signup
    ReactDOM.render(<Root store={store}/>, rootEl);
});
