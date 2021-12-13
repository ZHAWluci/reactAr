import React, { useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { metricActions } from '../../../store/metrics-slice'
import './ChangeMetric.scss'
import MetricsWrapper from '../../atoms/MetricsWrapper/MetricsWrapper'
import Slider from '../../molecules/Slider/Slider'
import Close from '../../atoms/Close/Close'

const ChangeMetric = (props) => {
    
    // ------------------------------------------------------------------------
    // Variables & States
    // ------------------------------------------------------------------------
    const [currentScore, setCurrentScore] = useState(0)   
    const { currentMetricTitle, initialMetricScore } = props

    // ------------------------------------------------------------------------
    // Handle Inital Score Value & Score Changes
    // ------------------------------------------------------------------------

    //Whenever the metricTitle changes, set the current score to initalMetricScore
    useEffect(() => {
        setCurrentScore(initialMetricScore)
    }, [currentMetricTitle,initialMetricScore])


    const sliderChangeHandler = (sliderValue)=>{
        setCurrentScore(sliderValue)
    }

    // ------------------------------------------------------------------------
    // Save new score value into Redux Store
    // ------------------------------------------------------------------------
    const dispatch = useDispatch()
    
    const sliderStopHandler = (sliderValue) =>{
        dispatch(metricActions.updateMetricScore({score: sliderValue, title: currentMetricTitle}))
    }



    return (
        <MetricsWrapper className="change-metric__container">
            <h3 className="change-metric__title">{currentMetricTitle}</h3>
            <Slider value={currentScore} onSliderChange={sliderChangeHandler} onSliderStop={sliderStopHandler} min="0" max="100"/>
            <Close onClick={props.onClose}/>
        </MetricsWrapper>
    )
}

export default ChangeMetric
