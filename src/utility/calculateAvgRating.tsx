// Calculate average rating for each products and update state
import { ProductItemType, ProductReviewPropertyType } from "../types/productsProviderTypes";
import textData from '../data/textData.json';

// Function to calculate the average rating for a given product's reviews
  export const calculateAverageRating = (reviews: ProductReviewPropertyType[]) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => {
      const rating = typeof review.rating === "number" ? review.rating : 0;
  
      if (isNaN(rating)) {
        throw new Error(textData["error-invalid-rating-value"]);
      }
  
      return sum + rating;
    }, 0);

    return totalRating / reviews.length;
  }

  // Function to update products array with calculatedRatingAvg
  export const updateProductsWithAverageRating = (products: ProductItemType[]) => {
    return products.map((product: ProductItemType) => {
      const averageRating = calculateAverageRating(product.review);
      return { ...product, calculatedRatingAvg: averageRating };
    });
  };