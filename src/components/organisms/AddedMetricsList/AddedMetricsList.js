import './AddedMetricsList.scss'
import React from 'react'
import MetricsWrapper from '../../atoms/MetricsWrapper/MetricsWrapper'
import AddedMetric from '../../molecules/AddedMetric/AddedMetric'

import { useSelector } from 'react-redux';

const AddedMetricsList = (props) => {
    const metrics = useSelector(state => state.metrics)
    
    const metricClickHandler =(metricTitle,metricScore)=>{
        props.onClickMetric(metricTitle,metricScore)
    }

    const addNewMetricClickHandler = ()=>{
        props.onClickNew()
    }

    return (
        <MetricsWrapper className="added-metrics__container">            
            {metrics.map((metric)=>(
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
