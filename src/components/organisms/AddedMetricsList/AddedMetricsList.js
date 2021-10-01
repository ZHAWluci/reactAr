import './AddedMetricsList.scss'
import React from 'react'
import MetricsWrapper from '../../atoms/MetricsWrapper/MetricsWrapper'
import AddedMetric from '../../molecules/AddedMetric/AddedMetric'

import { useSelector } from 'react-redux';

const AddedMetricsList = (props) => {
    const metrics = useSelector(state => state.metrics)
    
    const metricClickHandler =(title,score)=>{
        props.onClickMetric(title,score)
    }

    const addNewMetricClickHandler = ()=>{
        props.onClickNew()
    }

    return (
        <MetricsWrapper className="added-metrics__container">            
            {metrics.map((metric)=>(
                <AddedMetric 
                    onClick={metricClickHandler}
                    title={metric.title}
                    score={metric.score}
                    key={Math.random()}
                />
            ))}
            {!props.showAddMetricForm && <AddedMetric onClick={addNewMetricClickHandler} title="Add" score="+"/>}
        </MetricsWrapper>
    )
}

export default AddedMetricsList
