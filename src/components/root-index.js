import React from 'react'
// import WM from '@byted-ui/watermark/dist/sly';
import Demo from './dd';

class RootIndex extends React.Component {
    constructor(props) {
        super(props);
        // this.watermark = null;
    }

    componentDidMount() {
        // this.watermark = new WM({
        //     // Api: 'https://sdfs.com/api',
        //     UserId: '阿斯顿发生'
        // });
    }

    componentWillUnmount() {
        // this.watermark.close();
    }

    render() {
        return (
            <div>
                this is index root
                <Demo />
            </div>
        );
    }
}

export default RootIndex