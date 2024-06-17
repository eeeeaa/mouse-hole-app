import { AppContext } from "../../utils/contextProvider";
import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/routes/home.module.css";

import ErrorPage from "../common/error";
import LoadingPage from "../common/loadingPage";

import {
  getMyFeedUseCase,
  createPostUseCase,
} from "../../domain/post/postUseCase";

Home.propTypes = {
  isAll: PropTypes.bool,
};

function PostInputField() {
  const { cookies, notify } = useContext(AppContext);
  const token = cookies["token"];
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isButtonDisabled, setIsButtonDisalbed] = useState(false);

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
    } catch (error) {
      setLoading(false);
      setErr(error);
    }
  };

  useEffect(() => {
    setIsButtonDisalbed(
      files.length > 5 || title.length === 0 || content.length === 0
    );
  }, [content, title, files]);

  useEffect(() => {
    if (err) {
      notify(err.message);
    }
  }, [err, notify]);

  return (
    <div>
      <form
        className={styles["post-form"]}
        onSubmit={handleSubmit}
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

function AllPosts() {
  const { allPosts, setAllPosts } = useContext(AppContext);

  return (
    <div className={styles["post-list"]}>
      {allPosts.length > 0 ? (
        allPosts.map((post) => {
          return <div key={post._id}>test</div>;
        })
      ) : (
        <div>no posts</div>
      )}
    </div>
  );
}

function MyFeed() {
  const { myFeeds, setMyFeeds, cookies, notify } = useContext(AppContext);
  const token = cookies["token"];
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function initData() {
      try {
        setLoading(true);
        const { posts, error } = await getMyFeedUseCase(token);
        if (error) {
          setErr(error);
        }
        setLoading(false);
        setMyFeeds(posts);
      } catch (error) {
        setLoading(false);
        setErr(error);
      }
    }

    initData();
  }, []);

  useEffect(() => {
    if (err) {
      notify(err.message);
    }
  }, [err, notify]);

  if (loading) return <LoadingPage />;

  return (
    <div className={styles["post-list"]}>
      <div className={styles["post-list"]}>
        {myFeeds.length > 0 ? (
          myFeeds.map((post) => {
            return <div key={post._id}>{post.title}</div>;
          })
        ) : (
          <div>no posts</div>
        )}
      </div>
    </div>
  );
}

export default function Home({ isAll }) {
  return (
    <div>
      <PostInputField />
      {isAll ? <AllPosts /> : <MyFeed />}
    </div>
  );
}
