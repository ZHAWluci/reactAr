import { createSlice } from "@reduxjs/toolkit"

// ------------------------------------------------------------------------
// Reducer Explanations
// ------------------------------------------------------------------------
// addMetric:
// Will push a new object with a title and score into the array
// updateScoreOfMetric
// First, finds the indexOfMetric the title where the score needs to be updated.
// Then the state ois updated accordingly. 
// ------------------------------------------------------------------------


const cardSlice = createSlice({
    name:'card',
    initialState:[],
    reducers: {
        addCard(state,action){
            // The new card is simply pushed into the inital array
            // The card object itself is already prepared to have an
            // emptry metric array. 
            state.push({
                cardTitle: action.payload.cardTitle,
                // cardTitle: "action.payload.cardTitle",
                metrics: [],
            })
        },
        addMetric(state,action){
            // In order to add a new Metric to the current active Card,
            // first we find the index of where that card is placed in the array.
            // Then we push the new metric into 
            const indexOfCard = state.findIndex((card)=> card.cardTitle === action.payload.cardTitle)
            state[indexOfCard].metrics.push({
                metricTitle: action.payload.metricTitle,
                metricScore: 0,
            })
        },
        updateMetricScore(state,action){
            // In order to update the score of a metric of the current active card
            // we find the index of that card and go into the metric array. After that we 
            // find the index of the metric where we wantto update the score
            const indexOfCard = state.findIndex((card)=> card.cardTitle === action.payload.cardTitle)
            const indexOfMetric = state[indexOfCard].metrics.findIndex((metric) => metric.metricTitle === action.payload.metricTitle)
            state[indexOfCard].metrics[indexOfMetric].metricScore = action.payload.metricScore 
        }
    }
})


// ------------------------------------------------------------------------
// Exports
// ------------------------------------------------------------------------

export const cardActions = cardSlice.actions
export default cardSlice