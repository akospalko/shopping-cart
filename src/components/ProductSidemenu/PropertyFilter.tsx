// Sidebar component that displays grouped checkbox logic for product property filtering 
import { ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import useFilter from "../../hooks/useFilter";
import useToggleDropdownMenu from "../../hooks/useToggleDropdownMenu";
import useProductFilterOptions from "../../hooks/useCreateProductFilterOptions";
import { GroupKeysType } from "../../types/productsProviderTypes";
import { 
  FilterOptionsType,
  DefaultFilterOptionType, 
  RangeFilterOptionType,
  ActiveFilterOptionsStoredType,
} from "../../types/ProductFilterTypes";
import { ArrowIcon } from "../SVGComponents";
import Checkbox from "../UI/Checkbox";
import GroupHeaderInfoTooltip from "../UI/GroupHeaderInfoTooltip";
import { PRODUCT_GROUP_TOOLTIP_DATA } from "../../data/tooltipDataConstant";
import "./PropertyFilter.css";

// TYPES
type CheckboxChangeHandlerEventType = ChangeEvent<HTMLInputElement>

// Product Property Filter
const PropertyFilter = () => {
  // ROUTE
  const { category } = useParams();
  
  // CONTEXT
  const { filterOptions, dispatch, REDUCER_ACTIONS_FILTER } = useFilter();

  // HOOK
  const { isOpen, toggleDropdownHandler } = useToggleDropdownMenu();
  const { createActiveFilterOptionsSnapshot } = useProductFilterOptions();

  // HANDLER
  const handleCheckboxChange = (
    e: CheckboxChangeHandlerEventType,
    checkboxName: string | number,
    groupName: GroupKeysType
  ): void => {
    // create a deep copy of the state
    const updatedFilterOptionsValue: FilterOptionsType = JSON.parse(JSON.stringify(filterOptions));
  
    // find the checkbox in the group and update its isChecked property
    const checkboxGroup: (DefaultFilterOptionType | RangeFilterOptionType)[] =
      updatedFilterOptionsValue[groupName];
  
    const updatedCheckbox: DefaultFilterOptionType | RangeFilterOptionType | undefined = checkboxGroup.find(
      (checkbox) => String(checkbox.filter) === checkboxName
    );
    
    if (updatedCheckbox) {
      updatedCheckbox.isChecked = e.target.checked;
      // Dispatch the updated state to trigger a re-render
      dispatch({
        type: REDUCER_ACTIONS_FILTER.UPDATE_FILTER_OPTIONS,
        payload: { filterOptions: updatedFilterOptionsValue },
      });
      
      // Store filterOptions in session storage
      const sessionStorageFilterOptions: ActiveFilterOptionsStoredType = createActiveFilterOptionsSnapshot(updatedFilterOptionsValue);
      const storedFilterOptions: string = JSON.stringify([category, sessionStorageFilterOptions]);
      sessionStorage.setItem("filterOptions", storedFilterOptions);
    }
  };

  // STYLE
  const ArrowIconSize: string = "12px";
  const ArrowIconColor: string = "var(--color-2)";
 
  // JSX
  const getToggleGroupKey = (group: string, category: string=""): string => `${ group } ${ category }`

  return (
    <div className="propety-filter">
      { filterOptions && Object
      .keys(filterOptions)
      ?.map((group: string) => {

        const toggleGroupKey: string = getToggleGroupKey(group, category)
        const groupCheckboxArray: (DefaultFilterOptionType | RangeFilterOptionType)[] = filterOptions[group as GroupKeysType];
        
        return (
          <div 
            className="property-filter__group" 
            key={ group }
          >
            <div className="property-filter__header"> 
              <span className="property-filter__group-title">
                { group }
              </span>
              { group && PRODUCT_GROUP_TOOLTIP_DATA[group as GroupKeysType] && <GroupHeaderInfoTooltip
                content={ group } 
              />}
              <button 
                className="button--property-filter-group-toggler"
                onClick={ () => toggleDropdownHandler(toggleGroupKey) }
              > 
                { !isOpen[toggleGroupKey] ? 
                  <ArrowIcon width={ ArrowIconSize } height={ ArrowIconSize } fill={ ArrowIconColor } wrapperCustomStyle={ { "transform": "rotate(90deg)" } }/>
                  : 
                  <ArrowIcon width={ ArrowIconSize } height={ ArrowIconSize } fill={ ArrowIconColor } wrapperCustomStyle={ { "transform": "rotate(-90deg)" } }/>
                }
              </button>
            </div>
            { groupCheckboxArray?.map((checkbox, i) => (
              !isOpen[`${ group } ${ category }`] ? (
                <div 
                  className="property-filter__checkbox"
                  key={ i }
                >
                  <Checkbox
                    label={
                      "displayedFilterName" in checkbox
                      ? checkbox.displayedFilterName
                      : String(checkbox.filter) || ""
                    }
                    isChecked={ checkbox.isChecked }
                    onChange={ (e: CheckboxChangeHandlerEventType) => handleCheckboxChange(e, String(checkbox.filter), group as GroupKeysType) }
                  />
                  <span className="property-filter__count">{ `(${ checkbox.count })` }</span>
                </div> 
              ) : null 
            )) }
          </div>
        );
      }) }
    </div>
  )
}

export default PropertyFilter;