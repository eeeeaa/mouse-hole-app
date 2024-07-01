import PropTypes from "prop-types";
import styles from "../../styles/common/pageselect.module.css";
import { GrCaretPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";
import { useEffect } from "react";

PageSelect.propTypes = {
  pageState: PropTypes.object,
  prevButtonEnabled: PropTypes.bool,
  setPrevButtonEnabled: PropTypes.func,
  nextButtonEnabled: PropTypes.bool,
  setNextButtonEnabled: PropTypes.func,
  loadData: PropTypes.func,
};

export default function PageSelect({
  pageState,
  setPrevButtonEnabled,
  prevButtonEnabled,
  setNextButtonEnabled,
  nextButtonEnabled,
  loadData,
}) {
  const handleNext = () => {
    loadData(pageState.current + 1);
  };

  const handlePrevious = () => {
    loadData(pageState.current - 1);
  };

  useEffect(() => {
    setNextButtonEnabled(pageState.current + 1 < pageState.total);
    setPrevButtonEnabled(pageState.current > 0);
  }, [pageState, setNextButtonEnabled, setPrevButtonEnabled]);

  return (
    <div className={styles["page-select"]}>
      <>
        {prevButtonEnabled ? (
          <GrCaretPrevious
            className={styles["page-icon"]}
            onClick={handlePrevious}
          />
        ) : (
          <GrCaretPrevious className={styles["page-icon-disabled"]} />
        )}
      </>
      <div>
        {pageState.current + 1} / {pageState.total}
      </div>
      <>
        {nextButtonEnabled ? (
          <GrCaretNext className={styles["page-icon"]} onClick={handleNext} />
        ) : (
          <GrCaretNext className={styles["page-icon-disabled"]} />
        )}
      </>
    </div>
  );
}
