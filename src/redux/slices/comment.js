import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios.js"

const initialState = {
    comments: [],
    loading: false,
}

export const createComment = createAsyncThunk(
    "comment/createComment",
    async ({ postId, comment }) => {
        try {
            const { data } = await axios.post(`/comment/${postId}`, {
                postId, comment
            })
            return data
        } catch (err) {
            console.log(err);
        }
    }
)

export const getPostComments = createAsyncThunk(
    "comment/getPostComments",
    async (postId) => {
        try {
            console.log("getPostComments,     createAsyncThunk");
            const { data } = await axios.get(`/getcomment/${postId}`)
            return data
        } catch (err) {

        }
    }
)

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        addComment: (state, action) => {
            console.log(action.payload);
            state.comments.unshift(action.payload)
        }
    },
    extraReducers: {
        [createComment.panding]: (state) => {
            state.loading = true
        },
        [createComment.fulfilled]: (state, action) => {
            state.comments.push(action.payload)
            state.loading = false
        },
        [createComment.rejected]: (state) => {
            state.loading = false
        },
        //get comments
        [getPostComments.panding]: (state) => {
            state.loading = true
        },
        [getPostComments.fulfilled]: (state, action) => {
            state.comments = action.payload
            state.loading = false
        },
        [getPostComments.rejected]: (state) => {
            state.loading = false
        },
    }
})

export const commentReducer = commentSlice.reducer;
export const { addComment } = commentSlice.actions;