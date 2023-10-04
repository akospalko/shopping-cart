// Component to handle pagination logic, and display paginated pages
import { ReactElement } from 'react';
import './Pagination.css';
import { ArrowIcon } from './SVGComponents';
import { 
  PaginationPropsType, 
  NavigationButtonPropsType, 
  GoToPageButtonParameterType, 
  GoToPageButtonType } from '../types/paginationTypes';
import useProducts from '../hooks/useProducts';
import { useUpdateActivePage } from '../hooks/useUpdateActivePage';


// PAGINATION COMPONENT
const Pagination = ({totalPages}: PaginationPropsType) => {
  // CONTEXT
  const {activePage} = useProducts()
  const pageNumber = activePage || 1

  // HOOK 
  const updateActivePageHandler = useUpdateActivePage()

  // STYLES
  // custom style for prev (<) & next (>) buttons
  const navigationPrevNextButtonStyle = 'button-pagination-navigation-next-prev' 
  const navigationActiveButtonStyle = 'button--pagination-navigation__active' 

  // ELEMENTS
  // Go to a specific page button
  const goToPageButton: GoToPageButtonType = (page: GoToPageButtonParameterType): ReactElement => {
    return <NavigationButton 
      key={page}
      style={pageNumber === page ? navigationActiveButtonStyle : '' } 
      clicked={() => updateActivePageHandler(page)}
      disabled={pageNumber === page} 
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
    } else if (pageNumber <= 4) {
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
    } else if (pageNumber >= totalPages - 3) {
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
          {Array.from({ length: 3 }, (_, i) => pageNumber - 1 + i).map((page) => (
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
          clicked={() => updateActivePageHandler(pageNumber - 1)}
          disabled={pageNumber === 1}
          label={<ArrowIcon  width='12px' height='12px' fill='var(--color-1)'/>}
        />
        {renderPageButtons()}
        <NavigationButton
          style={navigationPrevNextButtonStyle}
          clicked={() => updateActivePageHandler(pageNumber + 1)}
          disabled={pageNumber === totalPages}
          label={<ArrowIcon  width='12px' height='12px' fill='var(--color-1)' wrapperCustomStyle={{'transform': 'rotate(180deg)'}}/>}
        />
      </div>
    </div>
  );
};

export default Pagination;

// REUSABLE BTN FOR PAGINATION 
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