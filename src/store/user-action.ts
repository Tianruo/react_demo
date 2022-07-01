// store
export interface IUserStore {
    userid: string;
}

// dispatch
export namespace IDispathUser {
    export interface ISetUser {
        type: UserActions.setUser;
        payload: Partial<IUserStore>;
    }
}

// actions
export enum UserActions {
    setUser = 'set_user',
}

export default UserActions;