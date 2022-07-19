import React, { useRef, useState } from 'react'
import { login_api_login, login_api_regist } from '@/server/login'
import { useHistory } from 'react-router-dom'
import styles from './login.less'

type IRef = HTMLInputElement | null

const Login: React.FC = () => {
    const loginemailref = useRef<IRef>(null)
    const loginpassref = useRef<IRef>(null)
    const registemailref = useRef<IRef>(null)
    const registpassref = useRef<IRef>(null)
    const history = useHistory()
    const [hasaccount, setHasaccount] = useState<boolean>(true)

    const handleLoginClick = async () => {
        const email = loginemailref.current?.value
        const pass = loginpassref.current?.value

        if (!email || !pass) return alert('no email or password')

        const res = await login_api_login(email, pass)

        console.log(res)

        if (res.error) return alert(res.error.message)

        alert('login ok')

        history.push('/home')
    }

    const handleRegistClick = async () => {
        const email = registemailref.current?.value
        const pass = registpassref.current?.value

        if (!email || !pass) return alert('no email or password')

        const res = await login_api_regist(email, pass)

        console.log(res)

        if (res.error) return alert(res.error.message)

        alert('regist ok')
    }

    return (
        <div className={styles.box}>
            <h3>login</h3>
            <div className={styles.info}>
                <input type="text" placeholder="email" ref={loginemailref} />
            </div>
            <div className={styles.info}>
                <input type="text" placeholder="password" ref={loginpassref} />
            </div>
            <div className={styles.login} onClick={handleLoginClick}>
                login
            </div>
            <span className={styles.btn} onClick={setHasaccount.bind(null, false)}>regist account</span>
            {!hasaccount && (
                <div>
                    <h3>regist</h3>
                    <div>
                        <input type="text" placeholder="email" ref={registemailref} />
                    </div>
                    <div>
                        <input type="text" placeholder="password" ref={registpassref} />
                    </div>
                    <div className={styles.login} onClick={handleRegistClick}>
                        regist
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login
