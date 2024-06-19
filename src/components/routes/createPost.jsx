import PostInputField from "../common/post/postInput";
import styles from "../../styles/routes/createpost.module.css";

export default function CreatePost() {
  return (
    <div className={styles.container}>
      <PostInputField />
    </div>
  );
}
