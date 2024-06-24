import styles from "../../../styles/routes/home.module.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../utils/contextProvider";

import { getAllPostsUseCase } from "../../../domain/post/postUseCase";
import LoadingPage from "../../common/loadingPage";
import PostItem from "../../common/post/postItem";

export default function AllPosts() {
  const { allPosts, setAllPosts, refresh, setRefresh, cookies, notify } =
    useContext(AppContext);

  const token = cookies["token"];
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { posts, error } = await getAllPostsUseCase(token);
        if (error) {
          setErr(error);
        }
        setLoading(false);
        setAllPosts(posts);
      } catch (error) {
        setLoading(false);
        setErr(error);
      }
    };
    if (refresh) {
      setRefresh(false);
      loadData();
    }
  }, [refresh, setAllPosts, setRefresh, token]);

  useEffect(() => {
    if (err) {
      notify(err.message, "error");
    }
  }, [err, notify]);

  if (loading) return <LoadingPage />;

  return (
    <div className={styles["post-list"]}>
      {allPosts.length > 0 ? (
        allPosts.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })
      ) : (
        <div>no posts</div>
      )}
    </div>
  );
}
