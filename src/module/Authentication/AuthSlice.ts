import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface User {
    userName: string | null;
    email: string | null;
    phone: string | null;
    password: string | null;
    loggedIn: boolean | null;
}

export interface AuthState {
  user: User,
  userList: User[];
};

const initialState: AuthState = {
  user :{
    userName:null,
    email: null,
    phone: null,
    password: null,
    loggedIn: false
  },
  userList: [],

};

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    signUp : (state, action: PayloadAction<any>) => {
        // state.user = action.payload;
        state.userList.push(JSON.parse(action.payload))
    },
    signIn : (state, action: PayloadAction<any>) => {
        const authUser = state.userList.find((user:User) => {
            return user.email === action.payload?.email && user.password === action.payload.password;
        });

        if(authUser?.email) {
            state.user = {...JSON.parse(action.payload), loggedIn:true};
        }

    },
    signInSimple : (state, action: PayloadAction<any>) => {
        const data = localStorage.getItem('users') as string;
        const parsedData = JSON.parse(data) as User;
        console.log(parsedData);
        let parsedPayload = JSON.parse(action.payload);
        if(parsedData.email === parsedPayload?.email && parsedData.password===parsedPayload.password ) {
            state.user = {...JSON.parse(action.payload), loggedIn:true};
        }
    }, 

    logout : (state) => {
        // const isLoggedIn = state.user.loggedIn && state.user.email;
        state.user = initialState.user;

    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { signUp, signIn, signInSimple, logout } = authSlice.actions;

export default authSlice.reducer;