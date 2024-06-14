import styles from "../../styles/common/topbar.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

MenuItem.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
};

function MenuItem({ link, title }) {
  return (
    <Link to={link} className={styles["menu-item"]}>
      <li>{title}</li>
    </Link>
  );
}

export default function TopBar() {
  return (
    <div className={styles["topbar"]}>
      <div className={styles["topbar-title"]}>MouseHole</div>
      <ul className={styles["menu-list"]}>
        <MenuItem link={"/"} title={"Home"} />
        <MenuItem link={"/all"} title={"All"} />
      </ul>
    </div>
  );
}
