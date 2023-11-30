// UI element to set/remove, display product rating
import { useState } from "react";
import { HeartIcon } from "../SVGComponents";
import "./ProductRating.css";

// TYPE
type ProductRatingPropsType = {
  readOnly: boolean,
  productRating: number,
  displaydRatingElements: number
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

  const handleClick = (selectedRating: number) => {
    if (!readOnly) {
      // If the selected rating is the same as the current rating, reset to 0 (remove rating)
      const newRating = selectedRating === rating ? 0 : selectedRating;
      setRating(newRating);
    }
  };

  return (
    <div className="product-rating-container">
      { [...Array(displaydRatingElements)].map((_, index: number) => {
        const currentRating = index + 1;
        return (
          <label key={ index } className="product-label">
            <input
              type="radio"
              name="rating"
              value={ currentRating }
              checked={ currentRating === rating }
              onChange={ () => {} } // Prevent console warnings about uncontrolled/controlled inputs
              readOnly={ readOnly }
              className="product-radio"
            />
            <div
              onClick={ () => handleClick(currentRating) }
              onMouseEnter={ () => !readOnly && setHover(currentRating) }
              onMouseLeave={ () => !readOnly && setHover(null) }
              className="product-rating"
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