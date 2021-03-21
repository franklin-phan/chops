import { createSlice } from '@reduxjs/toolkit';
import { auth } from './firebase'
import CreateUserData from './Components/Authentication/InitUserData'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
    //   state.user = action.payload;
        const newState = {...state, user : action.payload}
        console.log(action.payload)
        CreateUserData(action.payload)
        return newState
    },
    logout: (state) => {
        auth.signOut()
        const newState = {...state, user : null}
        return newState
    },
  },
});

export const { login, logout } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = state => state.user.user;

export default userSlice.reducer;