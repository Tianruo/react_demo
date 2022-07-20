import React, { useEffect, useRef, useState } from 'react'
import styles from './chatroom.less'
import { AppStore } from '@/store'
import { useSelector, useDispatch } from 'react-redux'
import {
    message_ws_connect,
    message_api_send,
    IMessage,
    message_api_pull,
    message_ws_addlistener,
    message_ws_removealllistener,
    message_ws_disconnect,
} from '@/server/message'

type IRef = HTMLInputElement | null

const App: React.FC = () => {
    const listRef = useRef<IRef>(null)
    const [text, setText] = useState<string>('')
    const [messageList, setMessageList] = useState<IMessage[]>([])
    const user = useSelector((store: AppStore) => store.user)

    useEffect(() => {
        const initMessage = async () => {
            const res = await message_api_pull()
            if (res.error) return console.error(res)

            setMessageList(res.data.reverse())
            console.log('messagelist', res.data)            
        }

        initMessage()

        message_ws_connect()

        return () => { message_ws_disconnect() }
    }, [])

    useEffect(() => {
        message_ws_removealllistener()
        message_ws_addlistener(data => {
            setMessageList([...messageList, data])
        })

        const listdom = listRef.current
        if (listdom) {
            listdom.scrollTop = listdom.scrollHeight
        }
    }, [messageList])

    const handleSendBtnClick = async () => {
        const message = text
        const res = await message_api_send(message || '')

        setText('')

        console.log('sendmsg', res)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') handleSendBtnClick()
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    return (
        <div className={styles.box}>
            <h3>Chat</h3>
            <div className={styles.messagecontainer} ref={listRef}>
                {messageList.map(m =>
                    m.user_id === user.userid ? (
                        <div key={m.id} className={`${styles.info} ${styles.mineinfo}`}>
                            <div className={styles.name}>{m.user_name}：</div>
                            <div className={styles.msg}>{m.message}</div>
                        </div>
                    ) : (
                        <div key={m.id} className={`${styles.info} ${styles.otherinfo}`}>
                            <div className={styles.name}>{m.user_name}：</div>
                            <div className={styles.msg}>{m.message}</div>
                        </div>
                    )
                )}
            </div>
            <div className={styles.inputcontainer}>
                <input
                    type="text"
                    placeholder="input message"
                    value={text}
                    onChange={handleTextChange}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSendBtnClick}>send</button>
            </div>
        </div>
    )
}

export default App
