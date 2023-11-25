// Component to handle pagination logic, and display paginated pages
import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowIcon } from './SVGComponents';
import { 
  PaginationPropsType, 
  NavigationButtonPropsType, 
  GoToPageButtonParameterType, 
  GoToPageButtonType } from '../types/paginationTypes';
  import './Pagination.css';

// PAGINATION COMPONENT
const Pagination = ({ totalPages, pageURLParams }: PaginationPropsType) => {
  // ROUTE
  const navigate = useNavigate();

  // EFFECT
  useEffect(() => {
    navigate(`/${ pageURLParams.category }/${ pageURLParams.page }`);
  }, [navigate, pageURLParams.page, pageURLParams.category]); 
  
  // HANDLER
  const navToPageHandler = (page: number): void => {
    navigate(`/${ pageURLParams.category }/${ page }`);
  }
  
  // STYLES
  // custom style for prev (<) & next (>) buttons
  const navigationPrevNextButtonStyle = 'button-pagination-navigation-next-prev'; 
  const navigationActiveButtonStyle = 'button--pagination-navigation__active';
  const iconSize = '12px';
  const iconColor = 'var(--color_1)';
  
  // ELEMENTS
  // Go to a specific page button
  const goToPageButton: GoToPageButtonType = (page: GoToPageButtonParameterType): ReactElement => {
    return (
      <NavigationButton 
        key={ page }
        style={ pageURLParams.page === page ? navigationActiveButtonStyle : '' } 
        // clicked={ () => updateActivePageHandler(page) }
        clicked={ () => navToPageHandler(page) }
        disabled={ pageURLParams.page === page } 
        label={ page }
      />
    )
  }

  // Ellipsis
  const goToPageButton_ellipsis = <span className='pagination-ellipsis'>...</span>

  // Display go to specific page buttons
  const renderPageButtons = () => {
    if (totalPages <= 7) {
      // If total pages <= 7, show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1).map((page: number) => goToPageButton(page));
    } else if (pageURLParams.page <= 4) {
      // Show pages 1-5, an ellipsis, and the last page
      return (
        <>
          { Array.from({ length: 5 }, (_, i) => i + 1).map((page: number) => goToPageButton(page) )}
          { goToPageButton_ellipsis }
          { goToPageButton(totalPages) }
        </>
      );
    } else if (pageURLParams.page >= totalPages - 3) {
      // Show the first page, an ellipsis, and pages totalPages-4 to totalPages
      return (
        <>
          { goToPageButton(1) }
          { goToPageButton_ellipsis }
          { Array.from({ length: 5 }, (_, i) => totalPages - 4 + i).map((page: number) => goToPageButton(page)) }
        </>
      );
    } else {
      // Show the first page, an ellipsis, and a few pages before and after the current page
      return (
        <>
          { goToPageButton(1) }
          { goToPageButton_ellipsis }
          { Array.from({ length: 3 }, (_, i) => pageURLParams.page - 1 + i).map((page: number) => goToPageButton(page)) }
          { goToPageButton_ellipsis }
          { goToPageButton(totalPages) }
        </>
      );
    }
  }

  return (
    <div className='pagination'>
      <div className='pagination__navigation'>
        <NavigationButton
          style={ navigationPrevNextButtonStyle }
          clicked={ () => navToPageHandler(pageURLParams.page - 1) }
          // clicked={ () => updateActivePageHandler(pageNumber - 1) }
          disabled={ pageURLParams.page === 1 }
          label={ <ArrowIcon  width={ iconSize } height={ iconSize } fill={ iconColor } /> }
        />
        { renderPageButtons() }
        <NavigationButton
          style={ navigationPrevNextButtonStyle }
          clicked={ () => navToPageHandler(pageURLParams.page + 1) }
          // clicked={ () => updateActivePageHandler(pageNumber + 1) }
          disabled={ pageURLParams.page === totalPages }
          label={ <ArrowIcon width={ iconSize } height={ iconSize } fill={ iconColor } wrapperCustomStyle={ { 'transform': 'rotate(180deg)' } }/> }
        />
      </div>
    </div>
  );
};

export default Pagination;

// REUSABLE PAGINATION BTN
const NavigationButton = ({ style, clicked, disabled, label }: NavigationButtonPropsType) => {
  return (
    <button
      className={ `button--pagination-navigation ${ style }` }
      onClick={ clicked }
      disabled={ disabled }
    > { label }
    </button>
  );
};