import { deleteComment } from "../../../domain/comment/commentUseCase";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../utils/contextProvider";
import styles from "../../../styles/common/comment.module.css";
import { MdOutlineDeleteForever } from "react-icons/md";
import Modal from "../modal";
import PropTypes from "prop-types";
import { decode } from "html-entities";

DeleteButton.propTypes = {
  toBeDeletedComment: PropTypes.object,
  postId: PropTypes.object,
};

CommentItem.propTypes = {
  comment: PropTypes.object,
  post: PropTypes.string,
};

function DeleteButton({ toBeDeletedComment, postId }) {
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

export default function CommentItem({ comment, post }) {
  return (
    <div className={styles["item-container"]}>
      <div className={styles["item-header"]}>
        <div className={styles["item-title"]}>
          {comment.author.display_name
            ? comment.author.display_name
            : comment.author.username}
        </div>
        <DeleteButton toBeDeletedComment={comment} postId={post._id} />
      </div>
      <div className={styles["item-content"]}>{decode(comment.message)}</div>
      <div className={styles["item-footer"]}>
        <div className={styles["item-date"]}>{comment.created_at}</div>
        <div className={styles["item-date"]}>{comment.updated_at}</div>
      </div>
    </div>
  );
}
