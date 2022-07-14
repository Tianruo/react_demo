// import { IDispathUser, IUserStore, UserActions } from '@/store/user-action';

import React from 'react'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { userActios } from '@/store/user'
import { AppStore } from '@/store';
import { check, trans } from '@tianruo/pack1';

interface IProps {
    user: AppStore['user'];
    dispatch: Dispatch;
}

interface IState {}

class TRDom extends HTMLElement {
    constructor() {
        super();
        this.createCustomDom();
    }

    createCustomDom = () => {
        const shadow = this.attachShadow({ mode: 'open' })

        const span = document.createElement('span')
        span.className = 'dom'
        span.innerText = 'this is a span'

        const info = document.createElement('span')
        const text = this.getAttribute('data-text')
        info.textContent = text

        const style = document.createElement('style')
        style.textContent = '.dom{color:red}'

        span.appendChild(info)
        shadow.appendChild(span)
        shadow.appendChild(style)
    }
}

customElements.define('tr-dom', TRDom);

class Home extends React.Component<IProps, IState> {
    componentDidMount() {
        console.log('home mount');
        const target = trans('target');
        console.log(target.b);
    }

    handleClick = () => {
        // this.props.dispatch<IDispathUser.ISetUser>({
        //     type: UserActions.setUser,
        //     data: { userid: 'home' },
        // });

        this.props.dispatch(userActios.setUser({
            userid: 'home'
        }))
    }

    render() {
        return (
            <div>
                <h3>Home</h3>
                <button onClick={this.handleClick}>set user home</button>
                <div>curr user is: {this.props.user.userid}</div>
                {/* <div is="tr-dom" data-text="123"></div> */}
                {/* <tr-dom data-text="123"></tr-dom> */}
            </div>
        );
    }
}

const mapStateToProps = (state: AppStore) => ({
    user: state.user,
})

export default connect(mapStateToProps)(Home)
