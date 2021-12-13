import { configureStore } from "@reduxjs/toolkit";

import metricSlice from "./metrics-slice";

const store = configureStore({
    reducer:{metrics: metricSlice.reducer}
})

export default store