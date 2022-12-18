import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addComment, createComment } from "../../redux/slices/comment";

export const Index = () => {
  const [comment, setComment] = useState("");
  const { fullName } = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const params = useParams();

  const handleInput = () => {
    try {
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      console.log({ postId, comment });

      dispatch(
        addComment({
          user: {
            fullName: fullName,
          },
          comment: comment,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => {
              handleInput();
              setComment("");
            }}
          >
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
