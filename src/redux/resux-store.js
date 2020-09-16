import {applyMiddleware, combineReducers, createStore} from "redux";
import usersReducer from "./usersReducer";
import thunkMiddleware from 'redux-thunk';

let reducers=combineReducers({
    usersPage: usersReducer,
});

const store= createStore(reducers,applyMiddleware(thunkMiddleware));


export default store;


