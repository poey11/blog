import { createSlice } from "@reduxjs/toolkit";

interface blogType {
    id: string;
    title: string;
    content: string;
    image?: string;
    created_at: Date;
    author_id: string;
}

const blogState: blogType[] = [];

const blogSlice = createSlice({
    name: 'blog',
    initialState: blogState,
    reducers: {
        setBlogs(_state, action: { payload: blogType[] }) {
            return action.payload;
        },
        addBlog(state, action: { payload: blogType }) {
            state.unshift(action.payload);
        },
        updateBlog(state, action: { payload: blogType }) {
            const index = state.findIndex(blog => blog.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        removeBlog(state, action: { payload: string }) {
            return state.filter(blog => blog.id !== action.payload);
        }   
    }

})

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer