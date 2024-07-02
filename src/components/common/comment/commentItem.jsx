import styles from "../../../styles/common/comment.module.css";
import PropTypes from "prop-types";
import { decode } from "html-entities";
import Placeholder from "../../../assets/image/placeholder.svg?react";
import { CommentDeleteButton } from "./commentDeleteButton";
import CommentLikeButton from "./commentLikeButton";

CommentItem.propTypes = {
  comment: PropTypes.object,
  post: PropTypes.string,
};

export default function CommentItem({ comment, post }) {
  return (
    <div className={styles["item-container"]}>
      <div className={styles["item-header"]}>
        {comment.author.profile_url ? (
          <img
            className={styles["profile-icon"]}
            src={comment.author.profile_url}
            alt={comment.author.username}
          />
        ) : (
          <Placeholder className={styles["profile-icon"]} />
        )}
        <div className={styles["item-title"]}>
          {comment.author.display_name
            ? comment.author.display_name
            : comment.author.username}
        </div>
        <CommentLikeButton postId={post._id} commentId={comment._id} />
        <CommentDeleteButton toBeDeletedComment={comment} postId={post._id} />
      </div>
      <div className={styles["item-content"]}>{decode(comment.message)}</div>
      <div className={styles["item-footer"]}>
        <div className={styles["item-date"]}>{comment.created_at}</div>
        <div className={styles["item-date"]}>{comment.updated_at}</div>
      </div>
    </div>
  );
}
