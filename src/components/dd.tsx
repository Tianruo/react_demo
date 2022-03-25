import React, { useState } from 'react'
import css from './dd.less';

const Demo = () => {
    const [show, setshow] = useState(false)

    const onclick = () => {
        setshow(true)
    }

    return (
        <div className={css.title} onClick={onclick}>
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
