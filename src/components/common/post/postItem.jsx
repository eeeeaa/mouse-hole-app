import styles from "../../../styles/common/postitem.module.css";
import PropTypes from "prop-types";
import Placeholder from "../../../assets/image/placeholder.svg?react";
import LinesEllipsis from "react-lines-ellipsis";
import { useEffect } from "react";

ImageItem.propTypes = {
  url: PropTypes.string,
};
PostItem.propTypes = {
  post: PropTypes.object,
};

function ImageItem({ url }) {
  return <img className={styles.image} src={url} alt="" />;
}

export default function PostItem({ post }) {
  useEffect(() => {
    console.log(post.images);
  }, []);
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
          <div className={styles["profile-name"]}>
            <LinesEllipsis
              text={
                post.author.display_name
                  ? post.author.display_name
                  : post.author.username
              }
              maxLine="1"
              ellipsis="..."
              trimRight={true}
              basedOn="letters"
            />
          </div>
        </div>
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
