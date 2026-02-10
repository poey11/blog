import  {configureStore} from '@reduxjs/toolkit';
import loadSlice from './loadSlice';
import userSlice from './userSlice';
import blogSlice from './blogSlice';
import commentSlice from './commentSlice';


const store = configureStore({
    reducer: {
        load: loadSlice,
        user: userSlice,
        blogs: blogSlice,
        comments: commentSlice
    }
})
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;    
    