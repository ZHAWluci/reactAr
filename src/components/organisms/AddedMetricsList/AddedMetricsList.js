import './AddedMetricsList.scss'
import React, { useEffect, useState } from 'react'
import MetricsWrapper from '../../atoms/MetricsWrapper/MetricsWrapper'
import AddedMetric from '../../molecules/AddedMetric/AddedMetric'

import { useSelector } from 'react-redux';

const AddedMetricsList = (props) => {
    const {currentCardTitle} = props
    
    const [activeCardIndex, setActiveCardIndex] = useState(0) 
    
    const cards = useSelector(state => state.cards)
    
    const metricClickHandler =(metricTitle,metricScore)=>{
        props.onClickMetric(metricTitle,metricScore)
    }

    const addNewMetricClickHandler = ()=>{
        props.onClickNew()
    }
    // Find Active Card Index

    useEffect(()=>{
        setActiveCardIndex(cards.findIndex((card)=> card.cardTitle === currentCardTitle))
    },[currentCardTitle,cards])

    return (
        <MetricsWrapper className="added-metrics__container">            
            {cards[activeCardIndex].metrics.map((metric)=>(
                <AddedMetric 
                    onClick={metricClickHandler}
                    metricTitle={metric.metricTitle}
                    metricScore={metric.metricScore}
                    key={Math.random()}
                />
            ))}
            {!props.showAddMetricForm && <AddedMetric onClick={addNewMetricClickHandler} metricTitle="Add" metricScore="+"/>}
        </MetricsWrapper>
    )
}

export default AddedMetricsList
