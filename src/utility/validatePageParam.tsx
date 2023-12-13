// Validate input page value received from url parameter 
import { integerRegEx } from "./regexPatterns";

export const validatePageParam = (page: string | undefined): number => {
  let validatedPageNumber: number = 1;
 
  // Check if page is undefined or empty
  if (page === undefined || !page) {
    return validatedPageNumber;
  }

  // Check if the page is a positive or negative integer
  if (integerRegEx.test(page)) {
    const parsedPage = parseInt(page, 10);
    
    // Take the absolute value of the parsed page
    const absolutePage = Math.abs(parsedPage);

    // Check if the absolute page is valid (> 0)
    if (absolutePage > 0 && absolutePage) {
      validatedPageNumber = absolutePage;
    }
  }
  return validatedPageNumber;
};