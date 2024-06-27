import styles from "../../../styles/common/comment.module.css";
import { createComment } from "../../../domain/comment/commentUseCase";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../utils/contextProvider";
import PropTypes from "prop-types";

CommentInputForm.propTypes = {};

export default function CommentInputForm({ isExpand, setIsExpand, post }) {
  const { cookies, notify } = useContext(AppContext);
  const token = cookies["token"];
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleToggleExpand = () => {
    setIsExpand(!isExpand);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (msg.trim()) {
        setLoading(true);
        const { comment, error } = await createComment(token, post._id, msg);

        if (error) {
          notify(error.message, "error");
          return;
        }
        notify("comment created", "success");
      }
      setLoading(false);
      setMsg("");
    } catch (error) {
      setLoading(false);
      notify(error.message, "error");
    }
  };

  useEffect(() => {
    if (loading) {
      notify("creating comment...", "default");
    }
  }, [loading, notify]);

  useEffect(() => {
    setIsButtonDisabled(loading || msg.length === 0);
  }, [loading, msg]);
  return (
    <div className={styles.container} onSubmit={handleSubmit}>
      <form className={styles["comment-form"]}>
        <div className={styles["comment-box-container"]}>
          <label htmlFor="message">Leave a comment</label>
          <textarea
            type="text"
            name="message"
            id="message"
            className={styles["comment-box"]}
            value={msg}
            cols={50}
            rows={3}
            onChange={(e) => setMsg(e.target.value)}
          />
        </div>
        <div className={styles.buttons}>
          <button type="submit" disabled={isButtonDisabled}>
            Create Comment
          </button>
          <button onClick={handleToggleExpand} type="button">
            toggle comment
          </button>
        </div>
      </form>
    </div>
  );
}
