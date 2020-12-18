import React from "react";
import ReactDOM from "react-dom";
import configureStore from './store/store';
import Root from './components/root';
import { createPost, destroyPost, updatePost } from './actions/news_feed_actions/post_actions'
import { createComment, destroyComment, updateComment} from './actions/news_feed_actions/comment_action'


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
    const rootEl = document.getElementById("root");
    ReactDOM.render(<Root store={store}/>, rootEl);
});
