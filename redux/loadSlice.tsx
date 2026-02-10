import { createSlice } from "@reduxjs/toolkit";


const loadState = {
    loading: false,
}
const loadSlice = createSlice({
    name: 'load',
    initialState: loadState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload
        }
    }
})
export const {setLoading} = loadSlice.actions
export default loadSlice.reducer
