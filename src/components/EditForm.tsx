import styles from "../styles/EditForm.module.css";
import { useAppDispatch } from "../app/hooks";
import { updateComment, updateReply } from "../features/comments/commentsSlice";

type EditFormProps = {
  id: number;
  commentId?: number;
  type: string;
  editInput: string | undefined;
  setEditInput: React.Dispatch<React.SetStateAction<string | undefined>>;
  setEditState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditForm = ({
  id,
  commentId,
  type,
  setEditState,
  editInput,
  setEditInput,
}: EditFormProps) => {
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    if (editInput !== "") {
      dispatch(
        type === "comment"
          ? updateComment({ id, content: editInput })
          : updateReply({
              commentId,
              replyId: id,
              content: editInput,
            })
      );
      setEditState(false);
    }
  };

  return (
    <div className={styles.edit_container}>
      <textarea
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
        className={styles.text_area}
      ></textarea>
      <div className={styles.button_update_container}>
        <button onClick={() => handleEdit()} className={styles.update_button}>
          UPDATE
        </button>
      </div>
    </div>
  );
};
