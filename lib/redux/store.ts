import { configureStore } from "@reduxjs/toolkit"
import { baserowApi } from "./services/baserowApi"
import authReducer from "./slices/authSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            [baserowApi.reducerPath]: baserowApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(baserowApi.middleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
