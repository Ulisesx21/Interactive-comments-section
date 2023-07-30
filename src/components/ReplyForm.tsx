import { useAppDispatch } from "../app/hooks";
import styles from "../styles/ReplyForm.module.css";
import { replyComment } from "../features/comments/commentsSlice";
import data from "../mocks/data.json";
import { User } from "../types/DataTypes";

type ReplyFormProps = {
  commentId?: number;
  id: number;
  user: User;
  replyInput: string;
  setReplyInput: React.Dispatch<React.SetStateAction<string>>;
  setReplyState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReplyForm = ({
  commentId,
  id,
  user,
  setReplyState,
  replyInput,
  setReplyInput,
}: ReplyFormProps) => {
  const dispatch = useAppDispatch();

  const handleReply = () => {
    if (replyInput !== "") {
      dispatch(
        replyComment({
          id,
          reply: replyInput,
          commentId,
          userName: user.username,
        })
      );
      setReplyState(false);
      setReplyInput("");
    }
  };

  return (
    <div className={styles.reply_comment_container}>
      <div className={styles.img_container}>
        <div>
          <img
            src={data.currentUser.image.png}
            className={styles.reply_user_img}
          />
        </div>
      </div>
      <textarea
        placeholder=""
        className={styles.reply_textarea}
        value={replyInput}
        onChange={(e) => setReplyInput(e.target.value)}
      />
      <div className={styles.reply_buttons_container}>
        <div className={styles.img_mobile_container}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={data.currentUser.image.png}
              className={styles.reply_user_img}
            />
          </div>
        </div>
        <div className={styles.reply_cancel_container}>
          <button
            onClick={() => handleReply()}
            className={styles.reply_button_reply}
          >
            REPLY
          </button>
          <button
            onClick={() => {
              setReplyState(false);
              setReplyInput("");
            }}
            className={styles.reply_button_cancel}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};
