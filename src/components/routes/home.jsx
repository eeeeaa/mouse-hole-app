import PropTypes from "prop-types";
import styles from "../../styles/routes/home.module.css";

import MyFeed from "./home/myFeed";
import AllPosts from "./home/allPost";

Home.propTypes = {
  isAll: PropTypes.bool,
};

export default function Home({ isAll }) {
  return (
    <div className={styles["container"]}>
      {isAll ? <AllPosts /> : <MyFeed />}
    </div>
  );
}
