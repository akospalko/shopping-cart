// Reusable checkbox
const Checkbox = ({ label="test", isChecked=false, onChange }) => {

  return (
    <label>
      <input
        type="checkbox"
        checked={ isChecked }
        onChange={ onChange }
      />
      {label}
    </label>
  );
};

export default Checkbox;