import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/contextProvider";
import PostItem from "../common/post/postItem";
import { getPost } from "../../domain/post/postUseCase";
import styles from "../../styles/routes/postdetail.module.css";

import LoadingPage from "../common/loadingPage";
import CommentList from "../common/comment/commentList";

export default function PostPage() {
  const { postId } = useParams();
  const { cookies, notify } = useContext(AppContext);
  const token = cookies["token"];

  const [detail, setDetail] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const { post, error } = await getPost(token, postId);
      if (error) {
        setLoading(false);
        setErr(error);
        return;
      }
      setLoading(false);
      setDetail(post);
    } catch (error) {
      setLoading(false);
      setErr(error);
    }
  };

  useEffect(() => {
    loadData();
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
      {detail ? (
        <>
          <PostItem post={detail} fullDetail={true} />
          <CommentList post={detail} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
