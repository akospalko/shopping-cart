// Filter menu reusable section header
import "./FilterMenuSectionHeader.css";

// TYPE
type FilterMenuSectionHeaderPropsType = {
  textContent: string
}

const FilterMenuSectionHeader = ({ textContent }: FilterMenuSectionHeaderPropsType) => {
  return <h3 className="filter-menu-section-header"> { textContent } </h3>
}

export default FilterMenuSectionHeader;