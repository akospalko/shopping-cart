// A  slider with 2 thumbs to filer product by min - max prices  
import ReactSlider from "react-slider";
import { SliderPropsTypes } from "../../types/ProductFilterTypes";
import "./Slider.css";

const Slider = ({ priceRange, priceValues, onChange, disabled }: SliderPropsTypes) => {

  return (
    <div className="slider-container">
      <ReactSlider
        className="slider"
        thumbClassName="slider-thumb"
        trackClassName="slider-track"
        value={ priceValues }
        min={ priceRange[0] }
        max={ priceRange[1] }
        onChange={ onChange }
        ariaLabel={ ["Lower thumb", "Upper thumb"] }
        ariaValuetext={ state => `Thumb value ${state.valueNow}` }
        pearling
        // step={10}
        minDistance={ 5 }
        disabled={ disabled }
      />
    </div>
  )
}

export default Slider;