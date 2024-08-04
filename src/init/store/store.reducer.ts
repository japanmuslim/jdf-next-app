import { DuaApi } from "@/services/api/duaService";
import { TafseerApi } from "@/services/api/tafseerService";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    // Add reducers here
    [TafseerApi.reducerPath]: TafseerApi.reducer,
    [DuaApi.reducerPath]: DuaApi.reducer,
});

export default rootReducer;