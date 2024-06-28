import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../utils/contextProvider";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../../../styles/routes/user/profile.module.css";
import FollowToggleButton from "../../common/followButton";

import { getProfileUseCase } from "../../../domain/user/userUseCase";
import { getUserPostsUseCase } from "../../../domain/post/postUseCase";

import LoadingPage from "../../common/loadingPage";
import PostItem from "../../common/post/postItem";

function UserPosts({ userId }) {
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

function UserProfile() {
  const { userId } = useParams();
  const { cookies, notify } = useContext(AppContext);
  const token = cookies["token"];

  const [profile, setProfile] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const { user, error } = await getProfileUseCase(token, userId);
        if (error) {
          setLoading(false);
          setErr(error);
        }

        setLoading(false);
        setProfile(user);
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
    <div className={styles.container}>
      {profile ? (
        <>
          <div className={styles.header}>
            <div className={styles["header-name"]}>
              {profile.display_name ? (
                <>
                  <h1 className={styles["header-title"]}>
                    {profile.display_name}
                  </h1>
                  <h2 className={styles["header-subtitle"]}>
                    {profile.username}
                  </h2>
                </>
              ) : (
                <>
                  <h1 className={styles["header-title"]}>{profile.username}</h1>
                </>
              )}
            </div>
            <div>
              <FollowToggleButton author={profile} />
            </div>
          </div>
          <div className={styles["content"]}>
            <>
              {profile.display_name ? (
                <>
                  <h1>{profile.display_name}&apos;s post</h1>
                </>
              ) : (
                <>
                  <h1>{profile.username}&apos;s post</h1>
                </>
              )}
            </>
            <UserPosts userId={userId} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return <UserProfile />;
}
