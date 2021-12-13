import React, {useState, useEffect, useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cardActions } from '../../../store/card-slice'

import AddMetricForm from '../../organisms/AddMetricForm/AddMetricForm'
import AddedMetricsList from '../../organisms/AddedMetricsList/AddedMetricsList'
import ChangeMetric from '../../organisms/ChangeMetric/ChangeMetric'
import ScannedCard from '../../atoms/ScannedCard/ScannedCardButton'
import './MetricsContainer.scss'

const MetricsContainer = (props) => {
    // ------------------------------------------------------------------------
    // States
    // ------------------------------------------------------------------------
    const dispatch = useDispatch()
    const cards = useSelector((state)=> state.cards)


    // ------------------------------------------------------------------------
    // States
    // ------------------------------------------------------------------------

    const [showAddMetricForm, setShowAddMetricForm] = useState(false)
    const [showChangeMetric, setShowChangeMetric] = useState(false)
    const [showAddedMetricList, setShowAddedMetricList] = useState(false)
    const [showScannedCard, setShowScannedCard] = useState(false)

    const [currentMetricTitle, setCurrentMetricTitle] = useState("")
    const [currentMetricScore, setCurrentMetricScore] = useState(0)
    const [currentCardTitle, setCurrentCardTitle] = useState('')
    
    // ------------------------------------------------------------------------
    // Alternative Card Titles
    // ------------------------------------------------------------------------ 
    // So that the displayed Title does not have to be the file name, the to be
    // displayed card titles can be chosen within the cardTitle array. 
    const cardTitles = useMemo(()=>[
        "IOT",
        "Big Data and Analytics",
        "Cloud Computing",
        "Cybersecurity",
        "Cobots",
        "Augmented Reality",
        "Virtual Reality",
        "Digital Twin",
        "Predictive Maintenance",
        "Additive Manufacturing",
        "Simulation",
        "Online Shop"
    ],[])

    const fileNames = useMemo(()=>[
        "pattern-1",
        "pattern-2",
        "pattern-3",
        "pattern-4",
        "pattern-5",
        "pattern-6",
        "pattern-7",
        "pattern-8",
        "pattern-9",
        "pattern-10",
        "pattern-11",
        "pattern-12",
    ],[])


    // ------------------------------------------------------------------------
    // Handle Active card
    // ------------------------------------------------------------------------ 
    useEffect(()=>{
        // useEffect will run when the component is rendered for the first time.
        // However, we only want setShowScannedCard(true) whenever props.activeCard
        // actually exists, meaning a card was already scanned.

        if(props.activeCard){
            setShowScannedCard(true)
            // Find the index of the activeCard within the fileNames array. That index is then used
            // to chose the correct cardTitle
            const fileNameInedex = fileNames.findIndex((fileName)=> fileName === props.activeCard)
            setCurrentCardTitle(cardTitles[fileNameInedex])
        }
    },[props.activeCard,cardTitles,fileNames])

    const scannedCardClickHandler = ()=>{
        setShowAddMetricForm(true)
        setShowAddedMetricList(true)
        setShowScannedCard(false)
        setShowChangeMetric(false)

        // If the card already exsits don't add it again
        // To this, I'm using the find method. If the card is found, it will return 
        // the value of that card. However, if the card isn't found it will return an
        // undefined. Hence, I'm using the negation of cards.find((card)=> card.cardTitle === currentCardTitle
        // so that if the card already exists, the dispatch will be skipped. 
        if(!(cards.find((card)=> card.cardTitle === currentCardTitle))){
            dispatch(cardActions.addCard({
                cardTitle: currentCardTitle
            }))
        }
    }
    
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
            {showScannedCard && <ScannedCard cardName={currentCardTitle} onClick={scannedCardClickHandler}/>}
            {!showScannedCard && <h1 className="metric-container__card-title">{currentCardTitle}</h1>}
            {(showChangeMetric && !showScannedCard) && <ChangeMetric currentCardTitle={currentCardTitle} currentMetricTitle={currentMetricTitle} initialMetricScore={currentMetricScore} onClose={closeClickHandler}/>}
            {(showAddMetricForm && !showScannedCard) && <AddMetricForm onClose={closeAddMetircFormHandler} currentCardTitle={currentCardTitle}/>}
            {(!showScannedCard && showAddedMetricList) && <AddedMetricsList currentCardTitle={currentCardTitle} showAddMetricForm={showAddMetricForm} onClickMetric={onClickMetric} onClickNew={onClcikNewHandler}/>}
        </div>
    )
}

export default MetricsContainer
