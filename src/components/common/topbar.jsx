import styles from "../../styles/common/topbar.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IoHomeOutline } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";

MenuItem.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
};

function MenuItem({ link, title, icon }) {
  return (
    <Link to={link} className={styles["menu-item"]}>
      <li className={styles.item}>
        {icon}
        <p>{title}</p>
      </li>
    </Link>
  );
}

export default function TopBar() {
  return (
    <div className={styles["topbar"]}>
      <div className={styles["topbar-title"]}>MouseHole</div>
      <ul className={styles["menu-list"]}>
        <MenuItem link={"/"} title={"Home"} icon={<IoHomeOutline />} />
        <MenuItem link={"/all"} title={"All"} icon={<BiWorld />} />
      </ul>
    </div>
  );
}
