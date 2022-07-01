// import UserAction, { IUserStore, IDispathUser } from './user-action';
// const userReducer = (state = userStore, action: ReduxAction) => {
//     switch (action.type) {
//         case UserAction.setUser:
//             return {
//                 ...state,
//                 ...action.data,
//             };
//         default:
//             return state;
//     }
// }
// export default userReducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserStore {
    userid: string;
}

const userStore: IUserStore = {
    userid: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState: userStore,
    reducers: {
        setUser(state, action: PayloadAction<Partial<IUserStore>>) {
            // 坑点：这里不能重新赋值，只能改内部值
            // state = {
            //     ...state,
            //     ...action.payload
            // };
            state.userid = action.payload.userid || ''
        }
    },
});

const userActios = userSlice.actions

const userReducer = userSlice.reducer

export { IUserStore, userActios }

export default userReducer
