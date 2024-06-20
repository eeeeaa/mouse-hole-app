import styles from "../../../styles/common/postitem.module.css";
import PropTypes from "prop-types";
import Placeholder from "../../../assets/image/placeholder.svg?react";
import LinesEllipsis from "react-lines-ellipsis";
import { AppContext } from "../../../utils/contextProvider";
import { useContext, useEffect, useState } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";

import { deletePost } from "../../../domain/post/postUseCase";
import {
  getMyFollowStatus,
  followUser,
  unfollowUser,
} from "../../../domain/user/userRelationshipUseCase";
import Modal from "../modal";

ImageItem.propTypes = {
  url: PropTypes.string,
};
PostItem.propTypes = {
  post: PropTypes.object,
};
DeletePostButton.propTypes = {
  toBeDeletedPost: PropTypes.object,
};

function ImageItem({ url }) {
  return <img className={styles.image} src={url} alt="" />;
}

function DeletePostButton({ toBeDeletedPost }) {
  const { getCurrentUser, notify, cookies, setRefresh } =
    useContext(AppContext);
  const token = cookies["token"];
  const user = getCurrentUser();

  const [confirmDialog, setConfirmDialog] = useState(false);

  const handleDeleteClick = async () => {
    setConfirmDialog(false);
    try {
      notify(`loading...`, "default");
      const { post, error } = await deletePost(token, toBeDeletedPost._id);

      if (error) {
        notify(error.message, "error");
        return;
      }

      notify(`post ${post._id} deleted`, "success");
      setRefresh(true);
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <div>
      {toBeDeletedPost.author._id === user.user_id ? (
        <div>
          <Modal
            handleClose={() => setConfirmDialog(false)}
            show={confirmDialog}
          >
            <div>do you want to delete this post?</div>
            <button onClick={handleDeleteClick}>delete post</button>
          </Modal>
          <MdOutlineDeleteForever
            className={styles["delete-button"]}
            onClick={() => setConfirmDialog(true)}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function FollowToggleButton({ postAuthor }) {
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

export default function PostItem({ post }) {
  const { getCurrentUser } = useContext(AppContext);
  const user = getCurrentUser();
  const [author, setAuthor] = useState("");

  useEffect(() => {
    let name = post.author.display_name
      ? post.author.display_name
      : post.author.username;
    setAuthor(name);
  }, [post, setAuthor, user]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.profile}>
          {post.author.profile_url ? (
            <img
              className={styles["profile-icon"]}
              src={post.author.profile_url}
              alt={post.author.username}
            />
          ) : (
            <Placeholder className={styles["profile-icon"]} />
          )}
          <div>
            <LinesEllipsis
              className={styles["profile-name"]}
              text={author}
              maxLine="1"
              ellipsis="..."
              basedOn="words"
            />
          </div>
        </div>
        {user.user_id === post.author._id ? (
          <></>
        ) : (
          <FollowToggleButton postAuthor={post.author} />
        )}
        <DeletePostButton toBeDeletedPost={post} />
      </div>
      <div className={styles.content}>
        <div>
          {post.image_urls.length > 0 ? (
            post.image_urls.map((url, index) => (
              <ImageItem key={index} url={url} />
            ))
          ) : (
            <></>
          )}
        </div>
        <div>
          <LinesEllipsis
            className={styles["text-content"]}
            text={post.content}
            maxLine="2"
            ellipsis="..."
            trimRight={true}
            basedOn="letters"
          />
        </div>
      </div>
      <div className={styles.footer}>
        <div>{post.created_at}</div>
        <div>{post.updated_at}</div>
      </div>
    </div>
  );
}
