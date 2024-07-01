import styles from "../../../styles/routes/home.module.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../utils/contextProvider";
import PropTypes from "prop-types";

import { getAllPostsUseCase } from "../../../domain/post/postUseCase";
import LoadingPage from "../../common/loadingPage";
import PostItem from "../../common/post/postItem";
import PageSelect from "../../common/pageSelect";

AllPosts.propTypes = {
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
};

export default function AllPosts({ refresh, setRefresh }) {
  const { allPosts, setAllPosts, cookies, notify } = useContext(AppContext);
  const token = cookies["token"];
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState({ current: 0, total: 0 });
  const [nextButtonEnabled, setNextButtonEnabled] = useState(true);
  const [prevButtonEnabled, setPrevButtonEnabled] = useState(false);

  const loadData = async (page) => {
    try {
      setLoading(true);
      const { posts, totalPages, currentPage, error } =
        await getAllPostsUseCase(token, page);
      if (error) {
        setErr(error);
      }
      setLoading(false);
      setAllPosts(posts);
      setPageState({ current: currentPage, total: totalPages });
    } catch (error) {
      setLoading(false);
      setErr(error);
    }
  };

  useEffect(() => {
    loadData(pageState.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
      loadData(pageState.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, setRefresh]);

  useEffect(() => {
    if (err) {
      notify(err.message, "error");
    }
  }, [err, notify]);

  if (loading) return <LoadingPage />;

  return (
    <div className={styles["post-container"]}>
      {allPosts.length > 0 ? (
        <PageSelect
          pageState={pageState}
          prevButtonEnabled={prevButtonEnabled}
          setPrevButtonEnabled={setPrevButtonEnabled}
          nextButtonEnabled={nextButtonEnabled}
          setNextButtonEnabled={setNextButtonEnabled}
          loadData={loadData}
        />
      ) : (
        <></>
      )}

      <div className={styles["post-list"]}>
        {allPosts.length > 0 ? (
          allPosts.map((post) => {
            return <PostItem key={post._id} post={post} />;
          })
        ) : (
          <div>no posts</div>
        )}
      </div>
    </div>
  );
}
