// Return paginated version of the provided products data array 
import { ProductItemType } from '../types/productsProviderTypes';

// TYPE
type IndexRangePriceType = {
  start: number,
  end: number
};

const paginateProducts = (data: ProductItemType[] | undefined, itemsPerPage: number, pageNumber: number): ProductItemType[] => {
  const indexRange: IndexRangePriceType = {
    start: (pageNumber - 1) * itemsPerPage,
    end: (pageNumber - 1) * itemsPerPage + itemsPerPage
  }
  
  return data?.slice(indexRange.start, indexRange.end) ?? [];
};

export default paginateProducts;