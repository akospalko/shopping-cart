// Component to handle pagination logic, and display paginated pages
import './Pagination.css'

// TYPES
type PaginationPropsType = {
  activePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type NavigationButtonPropsType = {
  key?: string | number
  style?: string // added style through className  
  clicked: () => void // click handler
  disabled?: boolean // disabled state
  label?: string | number // btn name
}

// COMPONENTS
const Pagination = ({activePage, totalPages, onPageChange}: PaginationPropsType) => {

  // CALCULATED & CONSTANT VALUES
  // Navigation button various vonditions
  const previousPageValue = activePage > 1 ? activePage - 1 : 1;
  const previousPageDisabledValue = activePage === 1;
  const nextPageValue = activePage < totalPages ? activePage + 1 : totalPages;
  const nextPageDisabledValue = activePage === totalPages;
  // Style
  const navigationButtonStyle = 'button--pagination-navigation'; 
  

  // ELEMENTS
  // Buttons
  // go to a specific page 
  const goToPageButton = Array.from({length: totalPages}, (_, i) => {
    const pageValue = i + 1;
    return (
      <NavigationButton 
        style={navigationButtonStyle} 
        clicked={() => onPageChange(pageValue)} 
        disabled={activePage === pageValue} 
        label={pageValue}
      />
    )
  })  

  return (
    <div className="pagination">
      <div className="pagination__navigation">
        <NavigationButton 
          style={navigationButtonStyle}
          clicked={() => {onPageChange(previousPageValue)}} 
          disabled={previousPageDisabledValue} 
          label='previous'
        />
        {goToPageButton} 
        <NavigationButton 
          style={navigationButtonStyle} 
          clicked={() => {onPageChange(nextPageValue)}} 
          disabled={nextPageDisabledValue} 
          label='next'
        />
      </div>
    </div>
  )
}
export default Pagination

// Reusable navigation btn used for page pagination 
const NavigationButton = ({style, clicked, disabled, label}: NavigationButtonPropsType) => {
  return (
    <button 
      className={style}
      onClick={clicked}
      disabled={disabled}
    > {label} </button>
  )
}