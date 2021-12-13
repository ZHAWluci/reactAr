import React from 'react'
import './AddedMetric.scss'

const AddedMetric = (props) => {
    
    // ------------------------------------------------------------------------
    // Enable onClick property on AddedMetric Component
    // ------------------------------------------------------------------------
    const clickHandler = ()=>{
        props.onClick(props.title, props.score)
    }


    return (
        <div onClick={clickHandler} className="added-metric__container">
            <h4 className="added-metric__title">{props.title}</h4>
            <p className="added-metric__score">{props.score}</p>
        </div>
    )
}

export default AddedMetric
