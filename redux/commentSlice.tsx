import { createSlice } from "@reduxjs/toolkit";


interface commentType {
    id: string;
    cAuthor_id: string;
    image?: string;
    created_at: string;
    comment: string;
    blog_id:string

}
const commentState: commentType[] = [];

const commentSlice = createSlice({
    name: 'comment',
    initialState: commentState,
    reducers: {
        setComments(_state, action: { payload: commentType[] }) {
            return action.payload;
        },
        addComments(state, action: { payload: commentType }) {
            state.unshift(action.payload);
        }
    }

})  

export const { setComments, addComments } = commentSlice.actions
export default commentSlice.reducer
