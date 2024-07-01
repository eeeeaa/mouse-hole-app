import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../../utils/contextProvider";
import CommentInputForm from "./commentinput";
import CommentItem from "./commentItem";
import styles from "../../../styles/common/comment.module.css";
import PropTypes from "prop-types";

import { getComments } from "../../../domain/comment/commentUseCase";
import LoadingPage from "../loadingPage";
import PageSelect from "../pageSelect";

CommentList.propTypes = {
  post: PropTypes.object,
};

export default function CommentList({ post }) {
  const { cookies, notify } = useContext(AppContext);
  const token = cookies["token"];
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [isExpand, setIsExpand] = useState(false);

  const [pageState, setPageState] = useState({ current: 0, total: 0 });
  const [nextButtonEnabled, setNextButtonEnabled] = useState(true);
  const [prevButtonEnabled, setPrevButtonEnabled] = useState(false);

  const loadComments = async (page) => {
    try {
      setLoading(true);
      const { comments, totalPages, currentPage, error } = await getComments(
        token,
        post._id,
        page
      );
      if (error) {
        setLoading(false);
        setErr(error);
        return;
      }

      setLoading(false);
      setData(comments);
      setPageState({ current: currentPage, total: totalPages });
    } catch (error) {
      setLoading(false);
      setErr(error);
    }
  };

  useEffect(() => {
    if (isExpand) {
      loadComments(pageState.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpand]);

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

      {isExpand && !loading && data.length > 0 ? (
        <PageSelect
          pageState={pageState}
          prevButtonEnabled={prevButtonEnabled}
          setPrevButtonEnabled={setPrevButtonEnabled}
          nextButtonEnabled={nextButtonEnabled}
          setNextButtonEnabled={setNextButtonEnabled}
          loadData={loadComments}
        />
      ) : (
        <></>
      )}

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
