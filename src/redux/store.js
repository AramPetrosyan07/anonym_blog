import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth.js";
import { commentReducer } from "./slices/comment.js";
import { postsReducer } from "./slices/posts.js"

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        comment: commentReducer
    }
})

export default store