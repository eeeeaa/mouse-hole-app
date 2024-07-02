import { AppContext } from "../../../utils/contextProvider";
import { useContext, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import PropTypes from "prop-types";
import { IoMdHeartHalf } from "react-icons/io";
import styles from "../../../styles/common/comment.module.css";

import {
  getCommentLikesUseCase,
  toggleLikeUseCase,
} from "../../../domain/comment/commentUseCase";

CommentLikeButton.propTypes = {
  postId: PropTypes.string,
  commentId: PropTypes.string,
};

export default function CommentLikeButton({ postId, commentId }) {
  const { notify, cookies } = useContext(AppContext);
  const token = cookies["token"];

  const [count, setCount] = useState(0);
  const [userLike, setUserLike] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleGetLikeClick = async () => {
    try {
      setLoading(true);
      const { likeCount, isUserLiked, error } = await getCommentLikesUseCase(
        token,
        postId,
        commentId
      );
      if (error) {
        notify(error.message, "error");
        setLoading(false);
        return;
      }
      setIsLoaded(true);
      setCount(likeCount);
      setUserLike(isUserLiked);
      setLoading(false);
    } catch (error) {
      notify(error.message, "error");
      setLoading(false);
    }
  };

  const handleToggleClick = async () => {
    try {
      setLoading(true);
      const { likeCount, isUserLiked, error } = await toggleLikeUseCase(
        token,
        postId,
        commentId
      );
      if (error) {
        notify(error.message, "error");
        setLoading(false);
        return;
      }
      setIsLoaded(true);
      setCount(likeCount);
      setUserLike(isUserLiked);
      setLoading(false);
    } catch (error) {
      notify(error.message, "error");
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          {isLoaded ? (
            <div className={styles["like-status"]}>
              <>
                {userLike ? (
                  <AiFillLike
                    className={styles["like-button"]}
                    onClick={handleToggleClick}
                  />
                ) : (
                  <AiOutlineLike
                    className={styles["like-button"]}
                    onClick={handleToggleClick}
                  />
                )}
              </>
              <div>{count}</div>
            </div>
          ) : (
            <IoMdHeartHalf
              onClick={handleGetLikeClick}
              className={styles["verify-like-button"]}
            />
          )}
        </>
      )}
    </div>
  );
}
