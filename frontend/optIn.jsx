import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from './components/root';
import { createProfile, updateProfile } from './actions/profile_actions/profile_actions'


document.addEventListener("DOMContentLoaded", () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
        
    }
    window.dispatch = store.dispatch;
    window.createProfile = createProfile;
    window.updateProfile = updateProfile;
    const rootEl = document.getElementById("root");
    ReactDOM.render(<Root store={store}/>, rootEl);
});
