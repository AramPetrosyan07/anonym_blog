import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../axios.js"

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const { data } = await axios.get("/posts");
    return data;
})

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
    const { data } = await axios.get("/tags");
    return data;
})
export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost", async (id) => {
    axios.delete(`/posts/${id}`)
}
)

export const fetchPostsByTags = createAsyncThunk("posts/fetchPostsByTags", async (name) => {
    const { data } = await axios.get(`/tags/${name}`);
    return data;

})

const initialState = {
    posts: {
        items: [],
        status: "loading"
    },
    tags: {
        items: [],
        status: "loading"
    },

}

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        sortPopular: (state, action) => {
            console.log("I am action");
            state.posts.items = state.posts.items.sort((a, b) => b.viewsCount - a.viewsCount)
        },

    },
    extraReducers: {
        //get posts
        [fetchPosts.panding]: (state) => {
            state.posts.items = [];
            state.posts.status = "loading"
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = (action.payload)
            state.posts.status = "loaded"
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = "error"
        },
        //get tags
        [fetchTags.panding]: (state) => {
            state.tags.items = [];
            state.tags.status = "loading"
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = (action.payload)
            state.tags.status = "loaded"
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = "error"
        },
        //delete post
        [fetchRemovePost.fulfilled]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        },
        // fetchPostsByTags
        [fetchPostsByTags.panding]: (state) => {
            state.posts.items = [];
            state.posts.status = "loading"
        },
        [fetchPostsByTags.fulfilled]: (state, action) => {
            state.posts.items = (action.payload)
            state.posts.status = "loaded"
        },
        [fetchPostsByTags.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = "error"
        },

    }
})

export const postsReducer = postsSlice.reducer;
export const { sortPopular, newItems } = postsSlice.actions;