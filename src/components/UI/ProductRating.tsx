// UI element to set/remove, display product rating
import { useState, KeyboardEvent } from "react";
import { HeartIcon } from "../SVGComponents";
import "./ProductRating.css";

// TYPE
type ProductRatingPropsType = {
  readOnly?: boolean,
  productRating?: number,
  displaydRatingElements?: number
}

const ProductRating = ({ readOnly = false, productRating = 0, displaydRatingElements = 5 }: ProductRatingPropsType ) => {
  // STYLE & VALUE
  const initialRating = productRating || 0;
  const iconSize = "20px";
  const iconColorFilled = "var(--color-2)";
  const iconColorEmpty = "var(--color-6)";

  // STATE
  const [rating, setRating] = useState<number>(initialRating);
  const [hover, setHover] = useState<number | null>(null);

  // HANDLER
  const ElementClickHandler = (selectedRating: number) => {
    if (!readOnly) {
      // If the selected rating is the same as the current rating, reset to 0 (remove rating)
      const newRating = selectedRating === rating ? 0 : selectedRating;
      setRating(newRating);
    }
  };

  const KeyDownHandler = (event: KeyboardEvent<HTMLDivElement>, currentRating: number) => {
    if (!readOnly && (event.key === "Enter")) {
      // Space or Enter key
      const newRating = currentRating === rating ? 0 : currentRating;
      setRating(newRating);
    }
  };

  return (
    <div className="product-rating-container">
      { [...Array(displaydRatingElements)].map((_, index: number) => {
        const currentRating = index + 1;
        return (
          <label 
            className="product-label"
            key={ index }
          >
            <input
              className="product-radio"
              type="radio"
              name="rating"
              value={ currentRating }
              checked={ currentRating === rating }
              onChange={ () => {} } // Prevent console warnings about uncontrolled/controlled inputs
              readOnly={ readOnly }
              tabIndex={ readOnly ? -1 : 0 }
            />
            <div
              className={ `product-rating ${ readOnly ? "product-rating--read-only" : "" }` }
              onClick={ () => ElementClickHandler(currentRating) }
              onKeyDown={ (event: KeyboardEvent<HTMLDivElement>) => KeyDownHandler(event, currentRating) }
              onMouseEnter={ () => !readOnly && setHover(currentRating) }
              onMouseLeave={ () => !readOnly && setHover(null) }
              tabIndex={ readOnly ? -1 : 0 }
            >
              <HeartIcon
                width={ iconSize }
                height={ iconSize }
                fill={ currentRating <= (hover || rating) ? iconColorFilled : iconColorEmpty }
                stroke={ currentRating <= (hover || rating) ? iconColorFilled : iconColorEmpty }
              />
            </div>
          </label>
        );
      }) }
    </div>
  );
};

export default ProductRating;