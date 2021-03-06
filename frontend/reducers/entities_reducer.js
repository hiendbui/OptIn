import usersReducer from './user_auth_reducers/users_reducer';
import { combineReducers } from 'redux';
import  profilesReducer  from './profiles_reducers/profiles_reducer';
import experiencesReducer from './profiles_reducers/experiences_reducer';
import educationsReducer from './profiles_reducers/educations_reducer';
import achievementsReducer from './profiles_reducers/achievements_reducer';
import connectionsReducer from './connections_reducer';
import postsReducer from './news_feed_reducers/posts_reducer';
import commentsReducer from './news_feed_reducers/comments_reducer';



const entitiesReducer = combineReducers({
    users: usersReducer,
    profiles: profilesReducer,
    experiences: experiencesReducer,
    educations: educationsReducer,
    achievements: achievementsReducer,
    connections: connectionsReducer,
    posts: postsReducer,
    comments: commentsReducer
})
export default entitiesReducer;