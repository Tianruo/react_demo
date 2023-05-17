import React, { useMemo, useRef, useState } from 'react'
import Minidoc, { IPage } from '@byted-blocks/volcano-engine-minidoc';
import styles from './index.less'
// import '@arco-design/web-react/dist/css/arco.css'; 

const Demo = () => {
    const [show, setshow] = useState(false)
    const bb = useRef(1);

    const onclick = () => {
        setshow(true)
        bb.current = 2
        aaa()
    }

    const aaa = useMemo(() => () => {
        const a = bb.current;
        alert(a);
    }, []);
    const ccc = useMemo(() => {
        const a = bb.current;
        return a;
    }, []);

    return (
        <div className={styles.title} onClick={onclick}>
            <p>{ccc}</p>
            <div className={styles.box}>
                <Minidoc page={IPage.HOME} libid={566} />
            </div>
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
