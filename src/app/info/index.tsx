import React, { useState } from 'react'
import styles from './index.less'

const Demo = () => {
    const [show, setshow] = useState(false)

    const onclick = () => {
        setshow(true)
    }

    return (
        <div className={styles.title} onClick={onclick}>
            <input></input>
            <p>JKLSSDDDDLKJLI</p>
            <p>sdfsfsdf</p>
            <p>JKLSSDDDDLKJLI</p>
            <p>sdfsfsdf</p>
            <p>JKLSSDDDDLKJLI</p>
            <p>sdfsfsdf</p>
            <p>JKLSSDDDDLKJLI</p>
            <p>sdfsfsdf</p>
            <p>JKLSSDDDDLKJLI</p>
            <p>sdfsfsdf</p>
        </div>
    )
}

export default Demo
