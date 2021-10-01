import React, {useState} from 'react'
import MetricsWrapper from '../../atoms/MetricsWrapper/MetricsWrapper'
import "./AddMetricForm.scss"

import { useDispatch } from 'react-redux'
import { metricActions } from '../../../store/metrics-slice'
import Close from '../../atoms/Close/Close'


const AddMetricForm = (props) => {

    const dispatch = useDispatch()

    // ------------------------------------------------------------------------
    // Listening to Inputs & Basic Validation
    // ------------------------------------------------------------------------
    const [enteredTitle, setEnteredTitle] = useState('')
    const [enteredTitleTouched, setEnteredTitleTouched] = useState(false)
    const [enteredTitleHasError, setEnteredTitleHasError] = useState(false)
    
    const inputChangeHandler = (event)=>{
        setEnteredTitle(event.target.value)
    }

    const inputBlurHandler = ()=>{
        setEnteredTitleTouched(true)
    }

    // ------------------------------------------------------------------------
    // Handle Button Click Event
    // ------------------------------------------------------------------------

    const clickAddHandler = ()=>{
        
        // Validation
        if(enteredTitle.trim() === ''){
            return
        } 

        // Add the new metric to the redux store
        dispatch(metricActions.addMetric({
            title: enteredTitle,
            score: "0",
        }))

        // Resest the entered title
        setEnteredTitle('')
        setEnteredTitleTouched(false)
    }   

    // ------------------------------------------------------------------------
    // Handle Close Click Event
    // ------------------------------------------------------------------------

    
    const clickCloseHandler =()=>{
        // This Function is then called within the parent, to set wether to show, or not show the AddMetricForm
        props.onCloseAddMetircForm()
    }

    return (
            <MetricsWrapper className="metric-form__container">
                <h3 className="metric-form__title">Add Metric</h3>
                <Close onClick={clickCloseHandler}/>
                <div className="metric-form__add">
                    {enteredTitleHasError && <p className="metric-form__add-input--error-text"></p>}
                    <input 
                        onChange={inputChangeHandler}
                        onBlur={inputBlurHandler}
                        type="text" 
                        className="metric-form__add-input" 
                        id="metric-form__add-input" 
                        placeholder="Metrics" 
                        value={enteredTitle}/>
                    <label htmlFor="metric-form__add-input" className="metric-form__add-label">Metric Name</label>
                    <button onClick={clickAddHandler} className="metric-form__add-button">Add</button>
                </div>
            </MetricsWrapper>
    )
}

export default AddMetricForm
