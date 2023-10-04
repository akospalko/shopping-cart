// Reusable on click update active page handler
import useProducts from './useProducts';

// CUSTOM HOOK
export const useUpdateActivePage = () => {
  // CONTEXT
  const {dispatch, REDUCER_ACTIONS_PRODUCT} = useProducts();

  // HANDLER
  const updateActivePageHandler = (page: number) => {
    const pageNum = Number(page) || 1;
    dispatch({
      type: REDUCER_ACTIONS_PRODUCT.UPDATE_ACTIVE_PAGE,
      payload: {activePage: pageNum},
    });
  };

  return updateActivePageHandler;
};
