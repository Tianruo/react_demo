import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'normalize.css'
import './app.less'
import store from '@/store'
import Login from '@/app/login/login'
import Home from '@/app/home/home'
import Info from '@/app/info'
// import { ConfigProvider } from 'antd'
// import zhCN from 'antd/lib/locale-provider/zh_CN'

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Router>
                {/* <ConfigProvider locale={zhCN}> */}
                    <Switch>
                        <Route path={'/'} exact={true} component={Home} />
                        <Route path={'/login'} component={Login} />
                        <Route path={'/home'} component={Home} />
                        <Route path={'/info'} component={Info} />
                    </Switch>
                {/* </ConfigProvider> */}
            </Router>
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
