import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import userReducer from '../reducers/user.reducer';

const middlewares = [ thunk ];

const store = createStore(
    combineReducers( {
        user: userReducer,
    } ),
    {},
    applyMiddleware( ...middlewares ),
);

export default store;
