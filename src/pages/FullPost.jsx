import React, { useCallback } from "react";

import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getPostComments } from "../redux/slices/comment";
import { useDispatch, useSelector } from "react-redux";

export const FullPost = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { comments } = useSelector((state) => state.comment);

  const fetchComments = useCallback(async () => {
    try {
      console.log("fetchComments function");
      dispatch(getPostComments(id));
    } catch (err) {
      console.log(err);
    }
  }, [id, dispatch]);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  let allComment = comments.map((obj) => ({
    user: {
      fullName: obj.user.fullName,
    },
    text: obj.comment,
  }));
  console.log(allComment);
  console.log(comments);

  if (isLoading) {
    return <Post isLoading={isLoading} />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <Index />
      <CommentsBlock items={allComment} isLoading={false}></CommentsBlock>
    </>
  );
};
