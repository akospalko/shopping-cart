// Reusable checkbox
import { ChangeEventHandler } from "react";
import "./Checkbox.css";

// TYPE
type CheckboxType = {
  label: string,
  isChecked: boolean,
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = ({ label="test", isChecked=false, onChange }: CheckboxType) => {

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
      { label }
    </>
  );
};

export default Checkbox;