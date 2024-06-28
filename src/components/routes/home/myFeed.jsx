import styles from "../../../styles/routes/home.module.css";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../utils/contextProvider";
import PropTypes from "prop-types";

import { getMyFeedUseCase } from "../../../domain/post/postUseCase";

import LoadingPage from "../../common/loadingPage";
import PostItem from "../../common/post/postItem";

MyFeed.propTypes = {
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
};

export default function MyFeed({ refresh, setRefresh }) {
  const { myFeeds, setMyFeeds, cookies, notify } = useContext(AppContext);
  const token = cookies["token"];
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
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
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
      loadData();
    }
  }, [refresh, setRefresh]);

  useEffect(() => {
    if (err) {
      notify(err.message, "error");
    }
  }, [err, notify]);

  if (loading) return <LoadingPage />;

  return (
    <div className={styles["post-list"]}>
      <div className={styles["post-list"]}>
        {myFeeds.length > 0 ? (
          myFeeds.map((post) => {
            return <PostItem key={post._id} post={post} />;
          })
        ) : (
          <div>no posts</div>
        )}
      </div>
    </div>
  );
}
