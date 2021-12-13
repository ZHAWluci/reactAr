import React, {useRef} from 'react'
import './Slider.scss'

const Slider = (props) => {
    // ------------------------------------------------------------------------
    // Refs 
    // ------------------------------------------------------------------------
    const sliderInputRef = useRef(0)
    const {min, max, value} = props;
    // ------------------------------------------------------------------------
    // Handling Input Events
    // ------------------------------------------------------------------------
    const onInputChangeHandler = ()=>{
        props.onSliderChange(sliderInputRef.current.value)
    }
    

    const onSliderStop = ()=>{
        props.onSliderStop(sliderInputRef.current.value)
    } 

    return (
        <div className="slider">
            <div className="slider__current-value">
                <span style={{left: value/(props.max - props.min) * 100 + "%"}}>
                    {value}
                </span>
            </div>
            <div className="slider__field">
                <div className="slider__value slider__value-min">{props.min}</div>
                <input 
                    className="slider__range" 
                    onMouseUp={onSliderStop}
                    onTouchEnd={onSliderStop}
                    onChange={onInputChangeHandler} 
                    ref={sliderInputRef} 
                    type="range" 
                    min={min} 
                    max={max}
                    value={value}>
                </input>
                <div className="slider__value slider__value-maxt">{props.max}</div>
            </div>
        </div>
    )
}

export default Slider
