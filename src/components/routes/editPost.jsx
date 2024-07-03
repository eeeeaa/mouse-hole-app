import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../utils/contextProvider";
import { useParams } from "react-router-dom";
import { getPost } from "../../domain/post/postUseCase";
import PostInputField from "../common/post/postInput";
import LoadingPage from "../common/loadingPage";

export default function EditPost() {
  const { cookies, notify } = useContext(AppContext);
  const token = cookies["token"];
  const { postId } = useParams();
  const [data, setData] = useState(null);

  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
        setData(post);
        notify("data fetched", "success");
      } catch (error) {
        setLoading(false);
        setErr(error);
      }
    };
    loadData();
  }, [notify, postId, token]);

  useEffect(() => {
    if (err) {
      notify(err.message, "error");
    }
  }, [err, notify, loading]);

  if (loading) return <LoadingPage />;

  return <div>{data ? <PostInputField postSrc={data} /> : <></>}</div>;
}
