// import { IDispathUser, IUserStore, UserActions } from '@/store/user-action';

import React from 'react'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { userActios } from '@/store/user'
import { AppStore } from '@/store';

interface IProps {
    user: AppStore['user'];
    dispatch: Dispatch;
}

interface IState {}

class Home extends React.Component<IProps, IState> {
    componentDidMount() {
        console.log('home mount');
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
            </div>
        );
    }
}

const mapStateToProps = (state: AppStore) => ({
    user: state.user,
})

export default connect(mapStateToProps)(Home)
