import { useContext } from "react";
import { AppContext } from "../../utils/contextProvider";
import styles from "../../styles/routes/myposts.module.css";

import UserPosts from "../common/post/userPostList";

export default function MyPosts() {
  const { getCurrentUser } = useContext(AppContext);
  const userId = getCurrentUser().user_id;

  return (
    <div className={styles.container}>
      <UserPosts userId={userId} />
    </div>
  );
}
