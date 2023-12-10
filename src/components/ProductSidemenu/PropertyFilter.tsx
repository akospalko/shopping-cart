// TODO: ADD toggler to groups: 
// Sidebar component that displays grouped checkbox logic for product property filtering 
import Checkbox from "../UI/Checkbox";
import useFilter from "../../hooks/useFilter";

// Product Property Filter
const PropertyFilter = () => {
  // CONTEXT
  const { filterOptions, setFilterOptions } = useFilter();

  // HANDLER
  const handleCheckboxChange = (e, checkboxName, groupName) => {
    console.log(checkboxName, groupName)

    const updatedValue = JSON.parse(JSON.stringify(filterOptions));
    const checkboxGroup = updatedValue[groupName];
    // Find the checkbox in the group and update its isChecked property
    const updatedCheckbox = checkboxGroup.find((checkbox) => checkbox.filter === checkboxName);
    if (updatedCheckbox) {
      updatedCheckbox.isChecked = e.target.checked;
    }
    setFilterOptions(updatedValue);
  };

  return (
    <div className='propety-filter'>
      { Object.keys(filterOptions)?.map((key) => {
        const groupCheckboxArray = filterOptions[key];
        return (
          <div key={ key }>
            <h3>{ key }</h3>
            {groupCheckboxArray?.map((checkbox, i) => (
              <div key={ i }>
                <Checkbox
                  label={ checkbox?.displayedFilterName ?? checkbox.filter }
                  isChecked={ checkbox.isChecked }
                  onChange={ (e) => handleCheckboxChange(e, checkbox.filter, key) }
                />
                <span> { `(${checkbox.count})` } </span>
              </div>
            )) }
          </div>
        );
      }) }
    </div>
  )
}

export default PropertyFilter;