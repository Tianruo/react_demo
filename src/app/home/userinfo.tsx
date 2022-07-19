import React, { useRef } from 'react'
import styles from './userinfo.less'
import { AppStore } from '@/store'
import { userActios } from '@/store/user'
import { useSelector, useDispatch } from 'react-redux'
import { user_api_changeuser_name } from '@/server/user'

type IRef = HTMLInputElement | null 

const UserInfo: React.FC = () => {
    const dispatch = useDispatch()
    const nameRef = useRef<IRef>(null)
    const user = useSelector((store: AppStore) => store.user);

    const handleSubmitClick = async () => {
        const newname = nameRef.current?.value

        if (newname) {
            const res = await user_api_changeuser_name(newname)
            if (res.error) return alert(res.error.message)

            dispatch(userActios.setUser({
                username: newname
            }));
        }
    }

    return (
        <div className={styles.box}>
            <div className={styles.infos}>
                <h3>User</h3>
                <div></div>
                <div><span>name：</span>{user.username}</div>
                <div><span>id：</span>{user.userid}</div>
                <div><span>color：</span>{user.usercolor}</div>
            </div>
            <div className={styles.modify}>
                <input type="text" placeholder="change name" ref={nameRef} />
                <button onClick={handleSubmitClick}>submit</button>
            </div>
        </div>
    )
}

export default UserInfo