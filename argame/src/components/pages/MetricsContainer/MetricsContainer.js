import React, {useState} from 'react'

import AddMetricForm from '../../organisms/AddMetricForm/AddMetricForm'
import AddedMetricsList from '../../organisms/AddedMetricsList/AddedMetricsList'
import ChangeMetric from '../../organisms/ChangeMetric/ChangeMetric'
import './MetricsContainer.scss'

const MetricsContainer = () => {
    // ------------------------------------------------------------------------
    // States
    // ------------------------------------------------------------------------

    const [showAddMetricForm, setShowAddMetricForm] = useState(true)
    const [showChangeMetric, setShowChangeMetric] = useState(false)
    const [currentMetricTitle, setCurrentMetricTitle] = useState("")
    const [currentMetricScore, setCurrentMetricScore] = useState(0)
    
    // ------------------------------------------------------------------------
    // Handle Show Metric Form. The closeAddMetircFormHandler is passed to the AddMetirc Form
    // ------------------------------------------------------------------------

    const closeAddMetircFormHandler = ()=>{
        setShowAddMetricForm(false)
    }

    const onClcikNewHandler = ()=>{
        setShowAddMetricForm(true)
        setShowChangeMetric(false)
    }

    // ------------------------------------------------------------------------
    // Handle Show Change Metric. 
    // ------------------------------------------------------------------------

    const onClickMetric = (title,score) =>{
        setShowChangeMetric(true)
        setShowAddMetricForm(false)
        setCurrentMetricTitle(title)
        setCurrentMetricScore(score)
    }

    const closeClickHandler = () =>{
        setShowChangeMetric(false)
    }

    return (
        <div className="metric-container">
            {showChangeMetric && <ChangeMetric currentMetricTitle={currentMetricTitle} initialMetricScore={currentMetricScore} onClose={closeClickHandler}/>}
            {showAddMetricForm && <AddMetricForm onCloseAddMetircForm={closeAddMetircFormHandler}/>}
            <AddedMetricsList showAddMetricForm={showAddMetricForm} onClickMetric={onClickMetric} onClickNew={onClcikNewHandler}/>
        </div>
    )
}

export default MetricsContainer
