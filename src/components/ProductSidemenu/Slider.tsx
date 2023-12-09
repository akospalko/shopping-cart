// 2 thumbs slider for products filtering, based on input min - max prices
import ReactSlider from "react-slider";
import { SliderPropsTypes } from "../../types/ProductFilterTypes";
import "./Slider.css";
import useFilter from "../../hooks/useFilter";

const Slider = ({ disabled }: SliderPropsTypes) => {
// CONTEXT
const { 
  priceFilterSlider, setPriceFilterSlider, 
  priceFilterRange
} = useFilter();

  return (
    <div className="slider-container">
      <ReactSlider
        className="slider"
        thumbClassName="slider-thumb"
        trackClassName="slider-track"
        value={ priceFilterSlider }
        min={ priceFilterRange[0] }
        max={ priceFilterRange[1] }
        onChange={ setPriceFilterSlider }
        ariaLabel={ ["Lower thumb", "Upper thumb"] }
        ariaValuetext={ state => `Thumb value ${ state.valueNow }` }
        pearling
        // step={ 10 }
        minDistance={ 5 }
        disabled={ disabled }
      />
    </div>
  )
}

export default Slider;