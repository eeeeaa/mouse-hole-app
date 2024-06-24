import styles from "../../../styles/common/postitem.module.css";
import PropTypes from "prop-types";
import Placeholder from "../../../assets/image/placeholder.svg?react";
import LinesEllipsis from "react-lines-ellipsis";
import { AppContext } from "../../../utils/contextProvider";
import { useContext, useEffect, useState } from "react";
import FollowToggleButton from "./followButton";
import DeletePostButton from "./deleteButton";
import ImageCarousel from "../imageCarousel";
import LikeButton from "./likeButton";

PostItem.propTypes = {
  post: PropTypes.object,
};
Header.propTypes = {
  post: PropTypes.object,
};
Content.propTypes = {
  post: PropTypes.object,
};
Footer.propTypes = {
  post: PropTypes.object,
};

function Footer({ post }) {
  return (
    <div className={styles.footer}>
      <LinesEllipsis
        className={styles["date"]}
        text={`created At: ${new Date(post.created_at).toLocaleDateString([], {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`}
        maxLine="2"
        ellipsis="..."
        trimRight
        basedOn="letters"
      />
      <LinesEllipsis
        className={styles["date"]}
        text={`updated At: ${new Date(post.updated_at).toLocaleDateString([], {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`}
        maxLine="2"
        ellipsis="..."
        trimRight
        basedOn="letters"
      />
    </div>
  );
}

function Content({ post }) {
  return (
    <div className={styles.content}>
      <ImageCarousel images={post.image_urls} />
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
  );
}

function Header({ post }) {
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
        <div>
          <LikeButton post={post} />
        </div>
        <div>
          {user.user_id === post.author._id ? (
            <></>
          ) : (
            <FollowToggleButton postAuthor={post.author} />
          )}
          <DeletePostButton toBeDeletedPost={post} />
        </div>
      </div>
    </div>
  );
}
export default function PostItem({ post }) {
  return (
    <div className={styles.container}>
      <Header post={post} />
      <Content post={post} />
      <Footer post={post} />
    </div>
  );
}
