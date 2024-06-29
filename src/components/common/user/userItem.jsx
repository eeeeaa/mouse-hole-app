import styles from "../../../styles/common/useritem.module.css";
import PropTypes from "prop-types";
import Placeholder from "../../../assets/image/placeholder.svg?react";
import FollowToggleButton from "../followButton";
import { useNavigate } from "react-router-dom";
import { BsFillPersonVcardFill } from "react-icons/bs";

UserItem.propTypes = {
  profile: PropTypes.object,
  clickable: PropTypes.bool,
};

export default function UserItem({ profile, clickable = false }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/users/${profile._id}`);
  };

  return (
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
            <h1 className={styles["header-title"]}>{profile.display_name}</h1>
            <h2 className={styles["header-subtitle"]}>{profile.username}</h2>
          </>
        ) : (
          <>
            <h1 className={styles["header-title"]}>{profile.username}</h1>
          </>
        )}
      </div>
      <div className={styles.buttons}>
        {clickable ? (
          <BsFillPersonVcardFill
            className={styles.icon}
            onClick={handleProfileClick}
          />
        ) : (
          <FollowToggleButton author={profile} />
        )}
      </div>
    </div>
  );
}
