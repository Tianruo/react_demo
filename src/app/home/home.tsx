import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './home.less'
import { userActios } from '@/store/user'
import { user_api_getuser } from '@/server/user'
import { useHistory } from 'react-router-dom'
import ChatRoom from './chatroom'
import UserInfo from './userinfo'

const App: React.FC = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    const account = window.localStorage.getItem('account')
    const token = window.localStorage.getItem('token')

    if (!account || !token) {
        history.push('/login')
        return null
    } 

    useEffect(() => {
        const getuser = async () => {
            const res = await user_api_getuser(account, token)

            if (res.error || !res.data.length) return history.push('/login')

            dispatch(userActios.setUser({
                userid: res.data[0].user_id,
                useraccount: res.data[0].user_account,
                usertoken: res.data[0].user_token,
                username: res.data[0].user_name,
                usercolor: res.data[0].user_color
            }));

            console.log('user: ', res.data[0])
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
