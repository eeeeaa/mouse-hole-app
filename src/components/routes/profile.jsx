import { useContext, useState } from "react";
import { AppContext } from "../../utils/contextProvider";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

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
  const { getCurrentUser, setCurrentUser, cookies } = useContext(AppContext);
  const token = cookies["token"];
  const currentUser = getCurrentUser();

  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [image, setImage] = useState(null);

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
    } catch (error) {
      setErr(error);
    }
  };

  if (err) return <ErrorPage errorMsg={err.message} />;
  if (loading) return <LoadingPage />;

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            name="image"
            id="image"
            accept=".gif,.jpg,.jpeg,.png"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="display_name">Display Name:</label>
          <input
            type="text"
            name="display_name"
            id="display_name"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </div>
        <button type="submit">Update profile</button>
      </form>
    </div>
  );
}

export default function ProfilePage({ isMe }) {
  return <div>{isMe ? <MyProfile /> : <UserProfile />}</div>;
}
