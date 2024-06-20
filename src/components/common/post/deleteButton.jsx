import styles from "../../../styles/common/postitem.module.css";
import PropTypes from "prop-types";

import { AppContext } from "../../../utils/contextProvider";
import { useContext, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

import { deletePost } from "../../../domain/post/postUseCase";
import Modal from "../modal";

DeletePostButton.propTypes = {
  toBeDeletedPost: PropTypes.object,
};

export default function DeletePostButton({ toBeDeletedPost }) {
  const { getCurrentUser, notify, cookies, setRefresh } =
    useContext(AppContext);
  const token = cookies["token"];
  const user = getCurrentUser();

  const [confirmDialog, setConfirmDialog] = useState(false);

  const handleDeleteClick = async () => {
    setConfirmDialog(false);
    try {
      notify(`loading...`, "default");
      const { post, error } = await deletePost(token, toBeDeletedPost._id);

      if (error) {
        notify(error.message, "error");
        return;
      }

      notify(`post ${post._id} deleted`, "success");
      setRefresh(true);
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <div>
      {toBeDeletedPost.author._id === user.user_id ? (
        <div>
          <Modal
            handleClose={() => setConfirmDialog(false)}
            show={confirmDialog}
          >
            <div>do you want to delete this post?</div>
            <button onClick={handleDeleteClick}>delete post</button>
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
