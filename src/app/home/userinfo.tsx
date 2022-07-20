import React, { useRef, useState } from 'react'
import styles from './userinfo.less'
import { AppStore } from '@/store'
import { userActios } from '@/store/user'
import { useSelector, useDispatch } from 'react-redux'
import { user_api_change_name } from '@/server/user'

type IRef = HTMLInputElement | null 

const UserInfo: React.FC = () => {
    const dispatch = useDispatch()
    const nameRef = useRef<IRef>(null)
    const [text, setText] = useState<string>('')
    const user = useSelector((store: AppStore) => store.user);

    const handleSubmitClick = async () => {
        const newname = text

        if (newname) {
            const res = await user_api_change_name(newname)
            if (res.error) return alert(res.error.message)

            dispatch(userActios.setUser({
                username: newname
            }));

            setText('')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') handleSubmitClick()
    }

    return (
        <div className={styles.box}>
            <div className={styles.infos}>
                <h3>User</h3>
                <div><span>name：</span>{user.username}</div>
                <div><span>account：</span>{user.useraccount}</div>
                <div><span>id：</span>{user.userid}</div>
                <div><span>color：</span>{user.usercolor}</div>
            </div>
            <div className={styles.modify}>
                <input type="text" placeholder="change name" ref={nameRef} value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
                <button onClick={handleSubmitClick}>submit</button>
            </div>
        </div>
    )
}

export default UserInfo