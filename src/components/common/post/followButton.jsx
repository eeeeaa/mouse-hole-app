import styles from "../../../styles/common/postitem.module.css";
import { AppContext } from "../../../utils/contextProvider";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  getMyFollowStatus,
  followUser,
  unfollowUser,
} from "../../../domain/user/userRelationshipUseCase";

FollowToggleButton.propTypes = {
  postAuthor: PropTypes.object,
};

export default function FollowToggleButton({ postAuthor }) {
  const { notify, cookies } = useContext(AppContext);
  const token = cookies["token"];
  const [follow, setFollow] = useState(false);
  const [buttonState, setButtonState] = useState("");

  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusLoaded, setStatusLoaded] = useState(false);

  const loadFollowStatus = async () => {
    try {
      setIsLoading(true);
      const { userRelationship, error } = await getMyFollowStatus(
        token,
        postAuthor._id
      );
      if (error) {
        setErr(error);
        setIsLoading(false);
        return;
      }

      if (userRelationship) {
        setFollow(true);
      } else {
        setFollow(false);
      }

      setIsLoading(false);
      setStatusLoaded(true);
    } catch (error) {
      setIsLoading(false);
      setErr(error);
    }
  };

  const handleFollowToggle = async () => {
    try {
      setIsLoading(true);
      if (follow) {
        //send unfollow request
        const { userRelationship, error } = await unfollowUser(
          token,
          postAuthor._id
        );
        if (error) {
          setErr(error);
          setIsLoading(false);
          return;
        }

        setFollow(false);
        setIsLoading(false);
      } else {
        //send follow request
        const { userRelationship, error } = await followUser(
          token,
          postAuthor._id
        );
        if (error) {
          setErr(error);
          setIsLoading(false);
          return;
        }

        setFollow(true);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setErr(error);
    }
  };

  useEffect(() => {
    if (follow) {
      setButtonState(styles["follow"]);
    } else {
      setButtonState("");
    }
  }, [follow]);

  useEffect(() => {
    if (err) {
      notify(err.message, "error");
    }
  }, [err, notify]);

  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div>
          {statusLoaded ? (
            <div
              className={`${styles["follow-button"]} ${buttonState}`}
              onClick={handleFollowToggle}
            >
              {follow ? "Following" : "Not Follow"}
            </div>
          ) : (
            <button onClick={loadFollowStatus}>follow status</button>
          )}
        </div>
      )}
    </div>
  );
}
