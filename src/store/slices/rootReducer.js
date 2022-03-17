import { combineReducers } from "redux";
import usersReducer from './userSlice';
import themesReducer from './themeSlice';

export default combineReducers({
    //duplicateUser: usersReducer
    entities: combineReducers({
        users: usersReducer
    }),
    ui: combineReducers({
        theme: themesReducer
    })
});


