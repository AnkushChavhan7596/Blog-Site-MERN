import { createSlice } from '@reduxjs/toolkit'

export const postsSlice = createSlice({
    name : "post",
    

    initialState : {
        posts : null,
        currentPost : null,
        singlePostId : null
    },

    reducers : {
        SET_POSTS : (state, action) =>{
            state.posts = action.payload
        },

        ADD_POST : (state, action) =>{
            state.posts = [...state.posts, action.payload]
        },

        DELETE_POST : (state, action) => {
            state.posts = state.posts.filter((excercise) => excercise._id !== action.payload._id)
        },

        CURRENT_POST : (state,action) => {
            state.currentPost = action.payload
        },

        SINGLEPOST_ID : (state, action) => {
            state.singlePostId = action.payload
        }

        // UPDATE_POST : (state, action) => {
        //     state.posts = state.posts.map((excercise) => {
        //         if(excercise._id === action.payload._id){
        //             return {...excercise, excercise:action.payload.excercise, reps : action.payload.reps}
        //         }

        //         return excercise;
        //     })
        // }
    }
})

export const { SET_POSTS, ADD_POST, DELETE_POST, CURRENT_POST } = postsSlice.actions;
export default postsSlice.reducer;