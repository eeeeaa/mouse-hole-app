import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../utils/contextProvider";
import CommentInputForm from "./commentinput";
import CommentItem from "./commentItem";
import styles from "../../../styles/common/comment.module.css";

import { getComments } from "../../../domain/comment/commentUseCase";
import LoadingPage from "../loadingPage";

export default function CommentList({ post }) {
  const { cookies, notify } = useContext(AppContext);
  const token = cookies["token"];
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [isExpand, setIsExpand] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        const { comments, error } = await getComments(token, post._id);
        if (error) {
          setLoading(false);
          setErr(error);
          return;
        }

        setLoading(false);
        setData(comments);
      } catch (error) {
        setLoading(false);
        setErr(error);
      }
    };

    if (isExpand) {
      loadComments();
    }
  }, [isExpand, token, post]);

  useEffect(() => {
    if (err) {
      notify(err.message, "error");
    }
  }, [err, notify]);

  return (
    <div>
      <CommentInputForm
        isExpand={isExpand}
        setIsExpand={setIsExpand}
        post={post}
      />

      <div className={styles["comment-list"]}>
        {isExpand ? (
          <>
            {loading ? (
              <LoadingPage />
            ) : (
              <>
                {data.length > 0 ? (
                  data.map((comment) => {
                    return (
                      <CommentItem
                        key={comment._id}
                        comment={comment}
                        post={post}
                      />
                    );
                  })
                ) : (
                  <>no comments</>
                )}
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
