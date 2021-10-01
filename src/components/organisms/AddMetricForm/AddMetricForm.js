import React, {useState} from 'react'
import MetricsWrapper from '../../atoms/MetricsWrapper/MetricsWrapper'
import "./AddMetricForm.scss"

import { useDispatch, useSelector } from 'react-redux'
import { metricActions } from '../../../store/metrics-slice'
import Close from '../../atoms/Close/Close'


const AddMetricForm = (props) => {

    const dispatch = useDispatch()

    // ------------------------------------------------------------------------
    // Get Metrics from store
    // ------------------------------------------------------------------------
    const metrics = useSelector(state => state.metrics)

    // ------------------------------------------------------------------------
    // States
    // ------------------------------------------------------------------------
    const [enteredMetricTitle, setEnteredMetricTitle] = useState('')
    const [enteredMetricTitleTouched, setEnteredMetricTitleTouched] = useState(false)
    const [enteredMetricTitleExists, setEnteredMetricTitleExists] = useState(false)
    
    // ------------------------------------------------------------------------
    // Validation
    // ------------------------------------------------------------------------

    // Check wether the enteredTitle already exists inside the redux store    
    const enteredMetricTitleIsValid = enteredMetricTitle.trim() !== '' && !enteredMetricTitleExists
    const enteredMetricTitleHasError = !enteredMetricTitleIsValid && enteredMetricTitleTouched

    // ------------------------------------------------------------------------
    // Listening to Input and Blur
    // ------------------------------------------------------------------------

    const inputChangeHandler = (event)=>{
        setEnteredMetricTitleExists(false)
        setEnteredMetricTitle(event.target.value)
    }


    const inputBlurHandler = ()=>{
        setEnteredMetricTitleTouched(true)
    }

    // ------------------------------------------------------------------------
    // Handle Button Click Event
    // ------------------------------------------------------------------------

    const clickAddHandler = ()=>{
        
        // Check wether the entered Metric Exists 
        // Explanation of Code:
        // For each metric.title we check wether the enteredMetric exists and return them 
        // in an array. With includes we check wether that array has a true. If it does
        // that means that the map function found a metric.title that was the same
        // as the enteredMetricTitle. We check this when submitting and not while typing
        // to be more performant

        if(metrics.map((metric)=> metric.title === enteredMetricTitle).includes(true)){
            setEnteredMetricTitleExists(true)
            return
        }
        
        // Add the new metric to the redux store
        dispatch(metricActions.addMetric({
            title: enteredMetricTitle,
            score: "0",
        }))

        // Resest the entered title
        setEnteredMetricTitle('')
        setEnteredMetricTitleTouched(false)
        setEnteredMetricTitleExists(false)
    }   

    // ------------------------------------------------------------------------
    // Handle Close Click Event
    // ------------------------------------------------------------------------

    
    const clickCloseHandler =()=>{
        // This Function is then called within the parent, to set wether to show, or not show the AddMetricForm
        props.onCloseAddMetircForm()
    }

    // ------------------------------------------------------------------------
    //  JSX Returns
    // ------------------------------------------------------------------------

    return (
            <MetricsWrapper className="metric-form__container">
                <h3 className="metric-form__title">Add Metric</h3>
                <Close onClick={clickCloseHandler}/>
                <div className="metric-form__add">
                    <input 
                        onChange={inputChangeHandler}
                        onBlur={inputBlurHandler}
                        type="text" 
                        className= {`metric-form__add-input ${enteredMetricTitleHasError  && 'metric-form__add-input--error'}`}
                        id="metric-form__add-input" 
                        placeholder="Metrics" 
                        autoComplete="off"
                        value={enteredMetricTitle}/>
                    {!enteredMetricTitleExists && <label htmlFor="metric-form__add-input" className="metric-form__add-label">Metric Name</label>}
                    {enteredMetricTitleExists &&  <p className="metric-form__add-error" >This Metric Name already exists</p>}
                    <button onClick={clickAddHandler} className="metric-form__add-button">Add</button>
                </div>
            </MetricsWrapper>
    )
}

export default AddMetricForm
