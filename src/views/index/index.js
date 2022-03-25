import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import 'normalize.css'
// import rootReducer from '@r/reducers'
import RootIndex from '@c/root-index.js'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

const store = createStore(() => {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class Index extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <RootIndex />
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ConfigProvider locale={zhCN}>
                <Index />
            </ConfigProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
)
