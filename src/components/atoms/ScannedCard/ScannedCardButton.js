import React from 'react'
import './ScannedCardButton.scss'

const ScannedCard = (props) => {
    return (
            <button onClick={props.onClick} className="scanned-card__button">{props.cardName}</button>
    )
}
export default ScannedCard
