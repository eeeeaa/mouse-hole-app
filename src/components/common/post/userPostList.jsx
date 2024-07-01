import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../utils/contextProvider";

import PropTypes from "prop-types";

import { getUserPostsUseCase } from "../../../domain/post/postUseCase";

import LoadingPage from "../../common/loadingPage";
import PostItem from "../../common/post/postItem";
import PageSelect from "../pageSelect";

import styles from "../../../styles/common/userpostlist.module.css";

UserPosts.propTypes = {
  userId: PropTypes.string,
};

export default function UserPosts({ userId }) {
  const { cookies, notify } = useContext(AppContext);
  const token = cookies["token"];
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  const [pageState, setPageState] = useState({ current: 0, total: 0 });
  const [nextButtonEnabled, setNextButtonEnabled] = useState(true);
  const [prevButtonEnabled, setPrevButtonEnabled] = useState(false);

  const loadData = async (page) => {
    try {
      setLoading(true);
      const { posts, totalPages, currentPage, error } =
        await getUserPostsUseCase(token, userId, page);
      if (error) {
        setLoading(false);
        setErr(error);
        return;
      }
      setLoading(false);
      setUserPosts(posts);
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
    if (err) {
      notify(err.message, "error");
    }
  }, [err, notify]);

  if (loading) return <LoadingPage />;

  return (
    <div className={styles.container}>
      <PageSelect
        pageState={pageState}
        prevButtonEnabled={prevButtonEnabled}
        setPrevButtonEnabled={setPrevButtonEnabled}
        nextButtonEnabled={nextButtonEnabled}
        setNextButtonEnabled={setNextButtonEnabled}
        loadData={loadData}
      />
      <div>
        {userPosts.length > 0 ? (
          userPosts.map((post) => {
            return <PostItem key={post._id} post={post} fullDetail={false} />;
          })
        ) : (
          <div>This user have no posts</div>
        )}
      </div>
    </div>
  );
}
