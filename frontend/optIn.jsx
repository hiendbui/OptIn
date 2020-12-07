import React from "react";
import ReactDOM from "react-dom";
// import * as SessionAPIUtil from "./util/session_api_util";

document.addEventListener("DOMContentLoaded", () => {
    const rootEl = document.getElementById("root");
    ReactDOM.render(<h1>Welcome to OptIn</h1>, rootEl);
});

// window.signup = SessionAPIUtil.signup;
// window.login = SessionAPIUtil.login;
// window.logout = SessionAPIUtil.logout;