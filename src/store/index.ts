// import { createStore, combineReducers } from 'redux';
// import { IUserStore } from './user-action';
// const store = createStore(
//     combineReducers({
//         user,
//     })
// );

import { configureStore } from '@reduxjs/toolkit'
import user from './user';

const store = configureStore({
    reducer: {
        user,
    }
});

export type AppDispatch = typeof store.dispatch

export type AppStore = ReturnType<typeof store.getState>

export default store;
