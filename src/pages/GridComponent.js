import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../redux/slices/posts";

const GridComponent = () => {
    const dispatch = useDispatch();
    const { posts, tags } = useSelector((state) => state.posts);
    const userData = useSelector((state) => state.auth.data);

    const isPostsLoading = posts.status === "loading";
    const isTagLoading = tags.status === "loading";

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, []);


    return (
        <Grid container spacing={4}>
            <Grid xs={8} item>
                {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
                    isPostsLoading ? (
                        <Post key={index} isLoading={true} />
                    ) : (
                        <Post
                            key={obj._id}
                            id={obj._id}
                            title={obj.title}
                            imageUrl={
                                obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                            }
                            user={obj.user}
                            createdAt={obj.createAt}
                            viewsCount={obj.viewsCount}
                            commentsCount={obj.comments.length}
                            tags={obj.tags}
                            isEditable={userData?._id === obj.user._id}
                        />
                    )
                )}
            </Grid>
            <Grid xs={4} item>
                <TagsBlock items={tags.items} isLoading={isTagLoading} />
            </Grid>
        </Grid>
    )
}

export default GridComponent