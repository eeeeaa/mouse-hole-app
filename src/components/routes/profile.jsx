import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/contextProvider";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../../styles/routes/profile.module.css";

import { updateMyProfile } from "../../domain/user/userUseCase";

import ErrorPage from "../common/error";
import LoadingPage from "../common/loadingPage";

ProfilePage.propTypes = {
  isMe: PropTypes.bool,
};

function UserProfile() {
  const { userId } = useParams();
  const { cookies } = useContext(AppContext);
  const token = cookies["token"];

  return <div>user profile of {userId}</div>;
}

function MyProfile() {
  const { getCurrentUser, setCurrentUser, cookies, notify } =
    useContext(AppContext);
  const token = cookies["token"];
  const currentUser = getCurrentUser();

  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const [displayName, setDisplayName] = useState(currentUser.display_name);
  const [image, setImage] = useState(null);

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { user, error } = await updateMyProfile(
        {
          display_name: displayName,
          file: image,
        },
        token,
        currentUser.user_id
      );
      if (error) {
        setErr(error);
      }
      setLoading(false);
      setCurrentUser({
        username: user.username,
        display_name: user.display_name,
        user_id: user._id,
        profile_url: user.profile_url,
      });
      notify("profile updated", "success");
    } catch (error) {
      setLoading(false);
      setErr(error);
    }
  };

  useEffect(() => {
    if (err) notify(err.message, "error");
    if (loading) notify("loading...", "default");
  }, [err, notify, loading]);

  useEffect(() => {
    setButtonDisabled(displayName.length === 0 || loading);
  }, [displayName, loading]);

  return (
    <div className={styles.container}>
      <form
        className={styles["profile-form"]}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className={styles["form-input-field"]}>
          <label htmlFor="image" className={styles["form-label"]}>
            Image:
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept=".gif,.jpg,.jpeg,.png"
            className={styles["form-input-file"]}
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className={styles["form-input-field"]}>
          <label htmlFor="display_name" className={styles["form-label"]}>
            Display Name:
          </label>
          <input
            type="text"
            name="display_name"
            id="display_name"
            className={styles["form-input-text"]}
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </div>
        <button
          className={styles["form-button"]}
          type="submit"
          disabled={buttonDisabled}
        >
          Update profile
        </button>
      </form>
    </div>
  );
}

export default function ProfilePage({ isMe }) {
  return <div>{isMe ? <MyProfile /> : <UserProfile />}</div>;
}
