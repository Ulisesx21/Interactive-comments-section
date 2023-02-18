import { useAppSelector } from "../app/hooks";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";
import styles from "../styles/CommentsList.module.css";

export const CommentsList = () => {

  const comments = useAppSelector((state) => state.comments);

  return (
    <div className={styles.comment_list_container}>
      {comments.map((comment) => (
        <div className={styles.comment_replies_container} key={comment.id}>
          <Comment type="comment" {...comment} />
          {comment.replies.map((reply) => (
            <Comment
              type="reply"
              key={reply.id}
              commentId={comment.id}
              {...reply}
            />
          ))}
        </div>
      ))}
      <CommentForm />
    </div>
  );
};
