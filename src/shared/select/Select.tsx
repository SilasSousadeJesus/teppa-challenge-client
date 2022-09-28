import React, { ChangeEvent } from "react";
import styles from './select.module.scss'

declare interface SelectProps {
  name?: string;
  value?: string;
  onChange?: (event:ChangeEvent<HTMLSelectElement> | undefined) => void;
}

const Select: React.FC<SelectProps> = (props) => {

  return (
    <select className={styles.select} name="sortselect" id="sortselect" value={props.value}  onChange={props.onChange}
    >
      <option value="" disabled> Todos / Favoritos   </option>
      <option value="all">Todos</option>
      <option value="favorite">Favoritos</option>
    </select>
  );
};

export default Select;
