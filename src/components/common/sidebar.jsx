import styles from "../../styles/common/sidebar.module.css";
import { useContext } from "react";
import { AppContext } from "../../utils/contextProvider";
import { Link, useNavigate } from "react-router-dom";
import Placeholder from "../../assets/image/placeholder.svg?react";
import PropTypes from "prop-types";
import LinesEllipsis from "react-lines-ellipsis";

MenuItem.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
};

LogoutMenuItem.propTypes = {
  title: PropTypes.string,
};

function MenuItem({ title, link }) {
  return (
    <Link to={link} className={styles["menu-item"]}>
      <li>{title}</li>
    </Link>
  );
}

function LogoutMenuItem({ title }) {
  const navigate = useNavigate();
  const { removeCurrentUser, removeCookie } = useContext(AppContext);
  const handleLogout = () => {
    removeCookie("token");
    removeCurrentUser();
    navigate("/auth/login");
  };
  return (
    <li className={styles["menu-item"]} onClick={handleLogout}>
      {title}
    </li>
  );
}

export default function Sidebar() {
  const { getCurrentUser } = useContext(AppContext);
  const user = getCurrentUser();
  return (
    <div className={styles["content"]}>
      <div className={styles["header"]}>
        {user.profile_url ? (
          <img
            className={styles["profile-icon"]}
            src={user.profile_url}
            alt={user.user_id}
          />
        ) : (
          <Placeholder className={styles["profile-icon"]} />
        )}
        <h1 className={styles["profile-name"]}>
          <LinesEllipsis
            text={user.display_name ? user.display_name : user.username}
            maxLine="1"
            ellipsis="..."
            trimRight={true}
            basedOn="letters"
          />
        </h1>
      </div>
      <ul className={styles["menu-list"]}>
        <MenuItem link={"/create-post"} title={"Create Post"} />
        <MenuItem link={"/my-profile"} title={"My profile"} />
        <MenuItem link={"/my-posts"} title={"My posts"} />
        <MenuItem link={"/my-followings"} title={"My followings"} />
        <LogoutMenuItem title={"Logout"} />
      </ul>
    </div>
  );
}
