import { memo, useRef } from "react";
import { SelectIcon } from "../../../Assets/Svg/Form";
import styles from "./select.module.scss";

const Select = memo(
  ({
    values = [],
    selected,
    setSelected,
    selectTitle = "",
    customStyles = {},
    beforePageContent,
    onDecrementPages
  }) => {
    const refSelect = useRef(null);

    const handleSelect = () => {
      refSelect.current.classList.toggle(styles.active);
    };

    const handleSelected = (val) => {
      setSelected(val);
    };

    // TODO: Create multiply select

    return (
      <div
        ref={refSelect}
        className={styles.wrapp}
        style={customStyles}
        onClick={handleSelect}
      >
        <div className={styles.select}>
          <p className={styles.title}>{selectTitle}</p>
          <p
            className={`${styles.selected} ${!selectTitle ? styles.centered : ""
              }`}
          >
            {selected && beforePageContent && (
              <span className={styles.beforePageContent}>
                {beforePageContent}
                <p>{selected?.name}</p>
              </span>
            )}
          </p>
          <SelectIcon />
          <div className={styles.content}>
          {Array.isArray(values) &&
              values.map((val) => (
                <div
                  key={val.name ?? val}
                  onClick={() => {
                    handleSelected(val);
                    // Call the callback prop when a specific condition is met
                    if (val.name === "Decrement Page" && onDecrementPages) {
                      onDecrementPages();
                    }
                  }}
                >
                  {val?.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
);

export default Select;
