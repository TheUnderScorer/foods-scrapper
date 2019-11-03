import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import userReducer from '../reducers/userReducer';
import errorReducer from '../reducers/errorReducer';

const middlewares = [ thunk ];

const store = createStore(
    combineReducers( {
        user: userReducer,
        error: errorReducer,
    } ),
    {},
    applyMiddleware( ...middlewares ),
);

export default store;
