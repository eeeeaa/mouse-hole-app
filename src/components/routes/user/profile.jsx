import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../utils/contextProvider";
import { useParams } from "react-router-dom";

import styles from "../../../styles/routes/user/profile.module.css";
import FollowToggleButton from "../../common/followButton";

import { getProfileUseCase } from "../../../domain/user/userUseCase";

import LoadingPage from "../../common/loadingPage";

import Placeholder from "../../../assets/image/placeholder.svg?react";
import UserPosts from "../../common/post/userPostList";

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
            <div>
              {profile.profile_url ? (
                <img
                  className={styles["profile-icon"]}
                  src={profile.profile_url}
                  alt={profile.username}
                />
              ) : (
                <Placeholder className={styles["profile-icon"]} />
              )}
            </div>
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
