import { deleteComment } from "../../../domain/comment/commentUseCase";
import { useContext, useState } from "react";
import { AppContext } from "../../../utils/contextProvider";
import styles from "../../../styles/common/comment.module.css";
import { MdOutlineDeleteForever } from "react-icons/md";
import Modal from "../modal";
import PropTypes from "prop-types";

CommentDeleteButton.propTypes = {
  toBeDeletedComment: PropTypes.object,
  postId: PropTypes.object,
};

export function CommentDeleteButton({ toBeDeletedComment, postId }) {
  const { getCurrentUser, notify, cookies, setRefresh } =
    useContext(AppContext);
  const token = cookies["token"];
  const user = getCurrentUser();

  const [confirmDialog, setConfirmDialog] = useState(false);

  const handleDeleteClick = async () => {
    setConfirmDialog(false);
    try {
      notify(`loading...`, "default");
      const { comment, error } = await deleteComment(
        token,
        postId,
        toBeDeletedComment._id
      );

      if (error) {
        notify(error.message, "error");
        return;
      }

      notify(`comment ${comment._id} deleted`, "success");
      setRefresh(true);
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <div>
      {toBeDeletedComment.author._id === user.user_id ? (
        <div>
          <Modal
            handleClose={() => setConfirmDialog(false)}
            show={confirmDialog}
          >
            <div>do you want to delete this comment?</div>
            <button onClick={handleDeleteClick}>delete comment</button>
          </Modal>
          <MdOutlineDeleteForever
            className={styles["delete-button"]}
            onClick={() => setConfirmDialog(true)}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
