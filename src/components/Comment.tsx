import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import iconReply from "../assets/icon-reply.svg";
import styles from "../styles/Comment.module.css";
import "../sass/Comment.scss";
import { Modal } from "./Modal";
import { CommentProps } from "../types/CommentProps";
import { ReplyForm } from "./ReplyForm";
import { EditForm } from "./EditForm";
import { ScoreButton } from "./ScoreButton";
import { DeleteEditButtons } from "./DeleteEditButtons";

export const Comment = ({
  type,
  score,
  content,
  createdAt,
  user,
  commentId,
  id,
  replyingTo,
}: CommentProps) => {
  const comments = useAppSelector((state) => state.comments);

  // Edit Input
  const [editInput, setEditInput] = useState<string | undefined>("");
  // Reply Input
  const [replyInput, setReplyInput] = useState<string>("");
  // Edit & Reply & Modal States
  const [editState, setEditState] = useState<boolean>(false);
  const [replyState, setReplyState] = useState<boolean>(false);
  const [modalState, setModalState] = useState<boolean>(false);

  const editComment = (id: number) => {
    let comment = comments.find((comment) => comment.id === id);
    setEditInput(comment?.content);
    setEditState(true);
  };

  const editReply = () => {
    let comment = comments.find((comment) => comment.id === commentId);
    comment?.replies.find((reply) => {
      if (reply.id === id) {
        setEditInput(reply.content);
      }
    });
    setEditState(true);
  };

  return (
    <div>
      <div
        className={
          type === "comment" ? styles.comment_container : styles.reply_container
        }
      >
        <ScoreButton 
        type={type} 
        id={id} 
        commentId={commentId} 
        score={score} 
        editComment={editComment}
        editReply={editReply}
        setModalState={setModalState}
        setReplyState={setReplyState}
        user={user}
        />
        <div style={{ width: "100%" }}>
          <div className={styles.comment_top_side}>
            <div className={styles.img_name_create_container}>
              <div>
                <img src={user.image.png} className={styles.user_img} />
              </div>
              <div className={styles.username}>{user.username}</div>
              {user.username === "juliusomo" && (
                <div className={styles.you_box}>you</div>
              )}
              <div className={styles.createAt}>{createdAt}</div>
            </div>
            <div className={styles.btns_container}>
              {user.username === "juliusomo" ? (
                <DeleteEditButtons
                  type={type}
                  id={id}
                  editComment={editComment}
                  editReply={editReply}
                  setModalState={setModalState}
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
          <div
            className={
              type === "comment"
                ? styles.content_edit_comment
                : styles.content_edit_reply
            }
          >
            {editState ? (
              <EditForm
                commentId={commentId}
                id={id}
                type={type}
                setEditState={setEditState}
                editInput={editInput}
                setEditInput={setEditInput}
              />
            ) : (
              <div className={styles.content_container}>
                {type === "reply" && (
                  <span className={styles.replyingTo}>@{replyingTo}</span>
                )}
                <span style={{ lineHeight: "1.4" }}>{content}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {replyState && (
        <ReplyForm
          commentId={commentId}
          id={id}
          user={user}
          setReplyState={setReplyState}
          replyInput={replyInput}
          setReplyInput={setReplyInput}
        />
      )}
      {modalState && (
        <Modal
          type={type}
          id={id}
          commentId={commentId}
          setModalState={setModalState}
        />
      )}
    </div>
  );
};
