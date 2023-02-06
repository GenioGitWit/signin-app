import { createSlice } from '@reduxjs/toolkit';
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
        let authUser = state.userList.filter((user:User) => {
            return user.email === action.payload?.email && user.password === action.payload.password;
        });

        state.user = {...state.user, loggedIn:true};
    },
    signInSimple : (state, action: PayloadAction<any>) => {
        state.user = {...JSON.parse(action.payload), loggedIn:true};
    }, 

    incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { incrementByAmount, signUp, signIn, signInSimple } = authSlice.actions;

export default authSlice.reducer;