import React, { useCallback, useEffect } from 'react';

const AAA = props => {
    let a: any = 0;

    useEffect(() => {
        console.log('aaa mount');
    }, []);

    console.log('render', props);

    const f1 = () => {
        console.log(11111, 'set');
        a = setTimeout(() => {
            console.log(11111, 'clear');
        }, 3000);
    };

    const f2 = () => {
        console.log(11111, a);
        clearTimeout(a);
    };

    const f3 = useCallback(() => {
        console.log(11111, 'set');
        a = setTimeout(() => {
            console.log(11111, 'clear');
        }, 3000);
    }, []);

    const f4 = useCallback(() => {
        console.log(11111, a);
        clearTimeout(a);
    }, []);

    return (
        <div
            // onMouseEnter={f3}
            // onMouseLeave={f4}
        >
            <h1>1111111111</h1>
            <h1>1111111111</h1>
            <h1>1111111111</h1>
            <h1>1111111111</h1>
            <h1>1111111111</h1>
        </div>
    )
};

export default React.memo(AAA);
