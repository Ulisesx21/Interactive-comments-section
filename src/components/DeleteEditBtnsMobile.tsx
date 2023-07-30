import iconEdit from "../assets/icon-edit.svg";
import iconDelete from "../assets/icon-delete.svg";
import styles from "../styles/DeleteEditBtnsMobile.module.css";

type DeleteEditBtnsMobile = {
  id: number;
  type: string;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  editComment: (id: number) => void;
  editReply: () => void;
};

export const DeleteEditBtnsMobile = ({
  id,
  type,
  setModalState,
  editComment,
  editReply,
}: DeleteEditBtnsMobile) => {
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
