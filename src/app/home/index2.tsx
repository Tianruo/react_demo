// import { IDispathUser, IUserStore, UserActions } from '@/store/user-action';

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userActios } from '@/store/user'
import { AppStore } from '@/store'


const App = () => {
    const dispatch = useDispatch();
    const { userid } = useSelector((store: AppStore) => store.user);

    const handleClick = () => {
        dispatch(userActios.setUser({
            userid: 'home'
        }));
    }

    return (
        <div>
            <h3>Home</h3>
            <button onClick={handleClick}>set user home</button>
            <div>curr user is: {userid}</div>
        </div>
    )
}

export default App
