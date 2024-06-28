import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../utils/contextProvider";

import PropTypes from "prop-types";

import { getUserPostsUseCase } from "../../../domain/post/postUseCase";

import LoadingPage from "../../common/loadingPage";
import PostItem from "../../common/post/postItem";

UserPosts.propTypes = {
  userId: PropTypes.string,
};

export default function UserPosts({ userId }) {
  const { cookies, notify } = useContext(AppContext);
  const token = cookies["token"];
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { posts, error } = await getUserPostsUseCase(token, userId);
        if (error) {
          setLoading(false);
          setErr(error);
          return;
        }
        setLoading(false);
        setUserPosts(posts);
      } catch (error) {
        setLoading(false);
        setErr(error);
      }
    };
    loadData();
  }, [token, userId]);

  useEffect(() => {
    if (err) {
      notify(err.message, "error");
    }
  }, [err, notify]);

  if (loading) return <LoadingPage />;

  return (
    <div>
      {userPosts.length > 0 ? (
        userPosts.map((post) => {
          return <PostItem key={post._id} post={post} fullDetail={false} />;
        })
      ) : (
        <div>This user have no posts</div>
      )}
    </div>
  );
}
