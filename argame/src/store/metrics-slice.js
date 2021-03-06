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


const metricSlice = createSlice({
    name:'metric',
    initialState:[],
    reducers: {
        addMetric(state,action){
            state.push({
                title: action.payload.title,
                score: 0,
            })
        },
        updateMetricScore(state,action){
            const indexOfMetric = state.findIndex((metric) => metric.title === action.payload.title)
            state[indexOfMetric].score = action.payload.score 
        }
    }
})


// ------------------------------------------------------------------------
// Exports
// ------------------------------------------------------------------------

export const metricActions = metricSlice.actions
export default metricSlice