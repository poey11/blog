import { createSlice } from "@reduxjs/toolkit";

interface userType{
    id: string | null;
    isUserSignedIn: boolean;
    email: string | null;
    username: string | null;
}

const userState:userType = {
    isUserSignedIn: false,
    id: null,
    email: null,
    username: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: userState,
    reducers: {
        setUser(state, action: { payload: userType }) {
            state.id = action.payload.id;
            state.isUserSignedIn = action.payload.isUserSignedIn;
            state.email = action.payload.email;
            state.username = action.payload.username;
        },
        removeUser(state) {
            state.isUserSignedIn = false;
            state.id = null;
            state.email = null;
            state.username = null;
        }
    }
})

export const {setUser,removeUser } = userSlice.actions
export default userSlice.reducer    