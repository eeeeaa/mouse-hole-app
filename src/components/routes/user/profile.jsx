import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../utils/contextProvider";
import { useParams } from "react-router-dom";

import styles from "../../../styles/routes/user/profile.module.css";

import { getProfileUseCase } from "../../../domain/user/userUseCase";

import LoadingPage from "../../common/loadingPage";

import UserPosts from "../../common/post/userPostList";
import UserItem from "../../common/user/userItem";

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
          <UserItem profile={profile} />
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
