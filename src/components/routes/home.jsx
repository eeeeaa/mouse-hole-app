import PropTypes from "prop-types";
import styles from "../../styles/routes/home.module.css";

import MyFeed from "./home/myFeed";
import AllPosts from "./home/allPost";

import { IoMdRefresh } from "react-icons/io";
import { useState } from "react";

Home.propTypes = {
  isAll: PropTypes.bool,
};

export default function Home({ isAll }) {
  const [refresh, setRefresh] = useState(true);
  return (
    <>
      <IoMdRefresh className="refresh-icon" onClick={() => setRefresh(true)} />
      <div className={styles["container"]}>
        {isAll ? (
          <AllPosts refresh={refresh} setRefresh={setRefresh} />
        ) : (
          <MyFeed refresh={refresh} setRefresh={setRefresh} />
        )}
      </div>
    </>
  );
}
