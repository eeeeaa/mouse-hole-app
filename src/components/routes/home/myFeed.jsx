import styles from "../../../styles/routes/home.module.css";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../utils/contextProvider";
import PropTypes from "prop-types";

import { getMyFeedUseCase } from "../../../domain/post/postUseCase";

import LoadingPage from "../../common/loadingPage";
import PostItem from "../../common/post/postItem";
import PageSelect from "../../common/pageSelect";

MyFeed.propTypes = {
  refresh: PropTypes.bool,
  setRefresh: PropTypes.func,
};

export default function MyFeed({ refresh, setRefresh }) {
  const { myFeeds, setMyFeeds, cookies, notify } = useContext(AppContext);
  const token = cookies["token"];
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState({ current: 0, total: 0 });
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);
  const [prevButtonEnabled, setPrevButtonEnabled] = useState(false);

  const loadData = async (page) => {
    try {
      setLoading(true);
      const { posts, totalPages, currentPage, error } = await getMyFeedUseCase(
        token,
        page
      );
      if (error) {
        setErr(error);
      }
      setLoading(false);
      setMyFeeds(posts);
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
      {myFeeds.length > 0 ? (
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
