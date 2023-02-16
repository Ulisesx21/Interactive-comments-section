import iconEdit from "../assets/icon-edit.svg";
import iconDelete from "../assets/icon-delete.svg";
import styles from "../styles/DeleteEditButtons.module.css"

type DeleteEditButtons = {
  id: number;
  type: string;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  editComment: (id: number) => void;
  editReply: () => void;
}

export const DeleteEditButtons = ({ id, type, setModalState, editComment, editReply }: DeleteEditButtons) => {
  return (
    <div style={{ display: "flex" }}>
      <button
        onClick={() => setModalState(true)}
        className={`${styles.delete_button} delete_button`}
      >
        <img src={iconDelete} className="delete_b" />
        Delete
      </button>
      <button
        onClick={type === "comment" ? () => editComment(id) : () => editReply()}
        className={`${styles.edit_button} edit_button`}
      >
        <img src={iconEdit} className="edit_b" />
        Edit
      </button>
    </div>
  );
};
