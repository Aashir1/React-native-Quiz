import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import authReducer from './reducer/authReducer';
import quizReducer from './reducer/quizReducer';

let reducers = combineReducers({
    authReducer,
    quizReducer
});

const loggerMiddleware = createLogger();
let store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export default store;