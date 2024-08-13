import { DuaApi } from '@/services/api/duaService';
import { QuizApi } from '@/services/api/quizService';
import { TafseerApi } from '@/services/api/tafseerService';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  // Add reducers here
  [TafseerApi.reducerPath]: TafseerApi.reducer,
  [DuaApi.reducerPath]: DuaApi.reducer,
  [QuizApi.reducerPath]: QuizApi.reducer,
});

export default rootReducer;
