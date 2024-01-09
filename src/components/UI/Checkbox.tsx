// Reusable checkbox
import { ChangeEventHandler } from "react";
import "./Checkbox.css";

// TYPE
type CheckboxType = {
  label: string,
  isChecked: boolean,
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = ({ label="", isChecked=false, onChange }: CheckboxType) => {
  return (
    <>
      <div className="checkbox__wrapper">
        <input
          className="checkbox"
          type="checkbox"
          checked={ isChecked }
          onChange={ onChange }
        />
      </div>
      <span className="checkbox__label">{ label }</span>
    </>
  );
};

export default Checkbox;