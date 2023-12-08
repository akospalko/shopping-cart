// Sidebar component that displays grouped checkbox logic for product property filtering 
import Checkbox from "../UI/Checkbox";

const GroupedList = ({ groupedData, handleCheckboxChange }) => {
  return (
    <div>
      {Object.keys(groupedData).map((key) => {
        const groupCheckboxArray = groupedData[key];
        return (
          <div key={ key }>
            <h3>{ key }</h3>
            {groupCheckboxArray?.map((checkbox, i) => (
              <div key={i}>
                <Checkbox
                  label={checkbox.filter}
                  isChecked={checkbox.isChecked}
                  onChange={(e) => handleCheckboxChange(e, checkbox.filter, key)}
                />
                <span> {`(${checkbox.count})`} </span>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

// Product Property Filter
const PropertyFilter = ({ propertyFilterGroups, setPropertyFilterGroups }) => {
  // HANDLER
  const handleCheckboxChange = (e, checkboxName, groupName) => {
    const updatedValue = JSON.parse(JSON.stringify(propertyFilterGroups));
    const checkboxGroup = updatedValue[groupName];
    // Find the checkbox in the group and update its isChecked property
    const updatedCheckbox = checkboxGroup.find((checkbox) => checkbox.filter === checkboxName);
    if (updatedCheckbox) {
      updatedCheckbox.isChecked = e.target.checked;
    }
    setPropertyFilterGroups(updatedValue);
  };

    
  return (
    <div className='propety-filter'>
      <GroupedList groupedData={ propertyFilterGroups } handleCheckboxChange={ handleCheckboxChange } />
    </div>
  )
}

export default PropertyFilter;