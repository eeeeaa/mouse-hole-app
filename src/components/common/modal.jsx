import styles from "../../styles/common/modal.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";

Modal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.array,
};

export default function Modal({ handleClose, show, children }) {
  const showHideClassName = show ? styles["modal-show"] : styles["modal-hide"];
  return (
    <div className={showHideClassName}>
      <section className={styles["modal-main"]}>
        <div className={styles["header"]}>
          <IoMdCloseCircleOutline
            className={styles["close-button"]}
            onClick={handleClose}
          />
        </div>

        <div className={styles["content"]}>{children}</div>
      </section>
    </div>
  );
}
