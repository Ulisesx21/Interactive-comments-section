import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addComment } from "../features/comments/commentsSlice";
import data from "../mocks/data.json";
import styles from "../styles/CommentForm.module.css";

export const CommentForm = () => {
  const [input, setInput] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleAddComment = () => {
    if (input !== "") {
      dispatch(addComment({ content: input }));
      setInput("");
    }
  };

  return (
    <div className={styles.comment_form_container}>
      <div className={styles.img_container}>
        <img
          src={data.currentUser.image.png}
          className={styles.comment_form_img}
        />
      </div>
      <textarea
        value={input}
        placeholder="Add a comment..."
        onChange={(e) => handleInput(e)}
        className={styles.comment_form_textarea}
      />
      <div className={styles.button_send_container}>
        <div className={styles.img_mobile_container}>
          <img
            src={data.currentUser.image.png}
            className={styles.comment_form_img}
          />
        </div>
        <button
          onClick={() => handleAddComment()}
          className={styles.comment_form_button}
        >
          SEND
        </button>
      </div>
    </div>
  );
};
