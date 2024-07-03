import styles from "../../../styles/common/postinput.module.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../utils/contextProvider";
import PropTypes from "prop-types";

import {
  createPostUseCase,
  editPostUseCase,
} from "../../../domain/post/postUseCase";

PostInputField.propTypes = {
  postSrc: PropTypes.object,
};

export default function PostInputField({ postSrc = null }) {
  const { cookies, notify } = useContext(AppContext);
  const token = cookies["token"];
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isButtonDisabled, setIsButtonDisalbed] = useState(false);
  const navigate = useNavigate();

  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { post, error } = await createPostUseCase({
        token: token,
        files: files,
        title: title,
        content: content,
      });
      if (error) {
        setErr(error);
        return;
      }
      setLoading(false);
      notify("post created", "success");
    } catch (error) {
      setLoading(false);
      setErr(error);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { post, error } = await editPostUseCase({
        token: token,
        files: files,
        title: title,
        content: content,
        postId: postSrc._id,
      });
      if (error) {
        setErr(error);
        return;
      }
      setLoading(false);
      notify("post edited", "success");
      navigate(`/posts/${post._id}`);
    } catch (error) {
      setLoading(false);
      setErr(error);
    }
  };

  useEffect(() => {
    if (postSrc) {
      setTitle(postSrc.title);
      setContent(postSrc.content);
    }
  }, [setTitle, setContent, postSrc]);

  useEffect(() => {
    setIsButtonDisalbed(
      files.length > 5 || title.length === 0 || content.length === 0 || loading
    );
  }, [content, title, files, loading]);

  useEffect(() => {
    if (err) {
      notify(err.message, "error");
    }
    if (loading) {
      notify("loading...");
    }
  }, [err, notify, loading]);

  return (
    <div>
      <form
        className={styles["post-form"]}
        onSubmit={postSrc ? handleEdit : handleSubmit}
        encType="multipart/form-data"
      >
        <div className={styles["post-field"]}>
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            name="images"
            id="images"
            multiple="multiple"
            accept=".gif,.jpg,.jpeg,.png"
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>
        <div className={styles["post-field"]}>
          <label htmlFor="title">title:</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className={styles["post-field"]}>
          <label htmlFor="content">Post:</label>
          <textarea
            className={styles["post-textarea"]}
            name="content"
            id="content"
            cols="50"
            rows="5"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></textarea>
        </div>
        <button type="submit" disabled={isButtonDisabled}>
          Post
        </button>
      </form>
    </div>
  );
}
