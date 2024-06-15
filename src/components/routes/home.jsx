import { AppContext } from "../../utils/contextProvider";
import { useContext } from "react";
import PropTypes from "prop-types";
import styles from "../../styles/routes/home.module.css";

Home.propTypes = {
  isAll: PropTypes.bool,
};

function PostInputField() {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.files.length > 5) {
      //show file limit error toast
      return;
    }
  };
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
          />
        </div>
        <div className={styles["post-field"]}>
          <label htmlFor="title">title:</label>
          <input type="text" name="title" id="title" />
        </div>
        <div className={styles["post-field"]}>
          <label htmlFor="content">Post:</label>
          <textarea
            className={styles["post-textarea"]}
            name="content"
            id="content"
            cols="50"
            rows="5"
            value={"post content"}
          ></textarea>
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

function AllPosts() {
  return <div className={styles["post-list"]}>all</div>;
}

function MyFeed() {
  return <div className={styles["post-list"]}>my feed</div>;
}

export default function Home({ isAll }) {
  return (
    <div>
      <PostInputField />
      {isAll ? <AllPosts /> : <MyFeed />}
    </div>
  );
}
