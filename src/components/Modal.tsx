import { useAppDispatch } from "../app/hooks";
import { removeComment, removeReply } from "../features/comments/commentsSlice";
import styles from "../styles/Modal.module.css";

type ModalProps = {
  id: number;
  commentId: number | undefined;
  type: string;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal({ setModalState, id, commentId, type }: ModalProps) {

  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles.modal_background}></div>
      <div className={styles.modal_content}>
        <h3>Delete comment</h3>
        <span>
          Are you sure you want to delete this commet? This will remove the
          comment and can´t be undone.
        </span>
        <div className={styles.modal_btns_container}>
          <button
            onClick={() => setModalState(false)}
            className={styles.modal_cancel_btn}
          >
            NO, CANCEL
          </button>
          <button
            onClick={() => {
              dispatch(
                type === "comment"
                  ? removeComment(id)
                  : removeReply({ commentId, replyId: id })
              );
            }}
            className={styles.modal_delete_btn}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
