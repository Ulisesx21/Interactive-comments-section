import iconPlus from "../assets/icon-plus.svg";
import iconMinus from "../assets/icon-minus.svg";
import iconReply from "../assets/icon-reply.svg";
import { useAppDispatch } from "../app/hooks";
import {
  decreaseCommentQuantity,
  decreaseReplyQuantity,
  increaseCommentQuantity,
  increaseReplyQuantity,
} from "../features/comments/commentsSlice";
import styles from "../styles/ScoreButton.module.css";
import "../sass/Comment.scss";
import { DeleteEditBtnsMobile } from "./DeleteEditBtnsMobile";
import { User } from "../types/DataTypes";

type ScoreButton = {
  type: string;
  id: number;
  commentId?: number;
  score: number;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  editComment: (id: number) => void;
  editReply: () => void;
  user: User;
  setReplyState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ScoreButton = ({ type, id, commentId, score, setModalState, editComment, editReply, user, setReplyState }: ScoreButton) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.score_container}>
      <div className={styles.score}>
        <button
          onClick={() =>
            dispatch(
              type === "comment"
                ? increaseCommentQuantity(id)
                : increaseReplyQuantity({ replyId: id, commentId })
            )
          }
          className={`${styles.score_button} score_button`}
        >
          <img src={iconPlus} className="score_b" />
        </button>
        <span className={styles.score_number}>{score}</span>
        <button
          onClick={() =>
            dispatch(
              type === "comment"
                ? decreaseCommentQuantity(id)
                : decreaseReplyQuantity({ replyId: id, commentId })
            )
          }
          className={`${styles.score_button} score_button`}
        >
          <img src={iconMinus} className={`${styles.minus_btn} score_b`} />
        </button>
      </div>
      <div className={`${styles.buttons_container}`}>
        {user.username === "juliusomo" ? (
          <DeleteEditBtnsMobile 
          editComment={editComment}
          editReply={editReply}
          id={id}
          setModalState={setModalState}
          type={type}
          />
        ) : (
          <button
            className={`${styles.reply_button} reply_button`}
            onClick={() => setReplyState(true)}
          >
            <img src={iconReply} className="reply_b" />
            Reply
          </button>
        )}
      </div>
    </div>
  );
};
