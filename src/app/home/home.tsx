import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './home.less'
import { userActios } from '@/store/user'
import { user_getuser, anon_user } from '@/server/user'
import { useHistory } from 'react-router-dom'
import ChatRoom from './chatroom'
import UserInfo from './userinfo'

const App: React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {
        if (!anon_user) return history.push('/login')

        const getuser = async () => {
            const user = await user_getuser()
            user && dispatch(userActios.setUser({
                userid: user.user_id,
                username: user.user_name,
                usercolor: user.user_color
            }));
            console.log('user: ', user)
        }
        getuser()
    }, [])

    return (
        <div className={styles.box}>
            <UserInfo />
            <ChatRoom />
        </div>
    )
}

export default App
