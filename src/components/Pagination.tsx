// Component to handle pagination logic, and display paginated pages
import { ReactElement } from 'react';
import './Pagination.css';
import { ArrowIcon } from './SVGComponents';

// TYPES
type PaginationPropsType = {
  activePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type NavigationButtonPropsType = {
  key?: string | number;
  style?: string;
  clicked: () => void;
  disabled?: boolean;
  label?: string | number | ReactElement | ReactElement[];
};

type GoToPageButtonParameterType = number;
type GoToPageButtonType = (page: GoToPageButtonParameterType ) => ReactElement

// COMPONENTS
const Pagination = ({ activePage, totalPages, onPageChange }: PaginationPropsType) => {
  // STYLES
  // custom style for prev (<) & next (>) buttons
  const navigationPrevNextButtonStyle = 'button-pagination-navigation-next-prev' 
  const navigationActiveButtonStyle = 'button--pagination-navigation__active' 

  // ELEMENTS
  // Go to a specific page button
  const goToPageButton: GoToPageButtonType = (page: GoToPageButtonParameterType): ReactElement => {
    return <NavigationButton 
      key={page}
      style={activePage === page ? navigationActiveButtonStyle : '' } 
      clicked={() => onPageChange(page)}
      disabled={activePage === page} 
      label={page}
    />
  }

  // Ellipsis
  const goToPageButton_ellipsis = <span className="pagination-ellipsis">...</span>

  // Display go to specific page buttons
  const renderPageButtons = () => {
    if (totalPages <= 7) {
      // If total pages <= 7, show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        goToPageButton(page)
      ));
    } else if (activePage <= 4) {
      // Show pages 1-5, an ellipsis, and the last page
      return (
        <>
          {Array.from({ length: 5 }, (_, i) => i + 1).map((page) => (
            goToPageButton(page)  
          ))}
          {goToPageButton_ellipsis}
          {goToPageButton(totalPages)}
        </>
      );
    } else if (activePage >= totalPages - 3) {
      // Show the first page, an ellipsis, and pages totalPages-4 to totalPages
      return (
        <>
          {goToPageButton(1)}
          {goToPageButton_ellipsis}
          {Array.from({ length: 5 }, (_, i) => totalPages - 4 + i).map((page) => (
            goToPageButton(page)
          ))}
        </>
      );
    } else {
      // Show the first page, an ellipsis, and a few pages before and after the current page
      return (
        <>
          {goToPageButton(1)}
          {goToPageButton_ellipsis}
          {Array.from({ length: 3 }, (_, i) => activePage - 1 + i).map((page) => (
            goToPageButton(page)
          ))}
          {goToPageButton_ellipsis}
          {goToPageButton(totalPages)}
        </>
      );
    }
  }

  return (
    <div className="pagination">
      <div className="pagination__navigation">
        <NavigationButton
          style={navigationPrevNextButtonStyle}
          clicked={() => onPageChange(activePage - 1)}
          disabled={activePage === 1}
          label={<ArrowIcon  width='12px' height='12px' fill='var(--color-1)'/>}
        />
        {renderPageButtons()}
        <NavigationButton
          style={navigationPrevNextButtonStyle}
          clicked={() => onPageChange(activePage + 1)}
          disabled={activePage === totalPages}
          label={<ArrowIcon  width='12px' height='12px' fill='var(--color-1)' wrapperCustomStyle={{'transform': 'rotate(180deg)'}}/>}
        />
      </div>
    </div>
  );
};

export default Pagination;

// Reusable navigation btn used for page pagination 
const NavigationButton = ({ style, clicked, disabled, label }: NavigationButtonPropsType) => {
  return (
    <button
      className={`button--pagination-navigation ${style}`}
      onClick={clicked}
      disabled={disabled}
    > {label}
    </button>
  );
};