import { ArticleApi } from '@/services/api/articleService';
import { DuaApi } from '@/services/api/duaService';
import { FaqApi } from '@/services/api/faqService';
import { HomeApi } from '@/services/api/homeService';
import { IslamicBooksApi } from '@/services/api/islamicBooksService';
import { QuestionApi } from '@/services/api/questionService';
import { QuizApi } from '@/services/api/quizService';
import { TafseerApi } from '@/services/api/tafseerService';
import categoryIdReducer from '@/services/slice/categoryIdSlicer';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  // Add reducers here
  [HomeApi.reducerPath]: HomeApi.reducer,
  [TafseerApi.reducerPath]: TafseerApi.reducer,
  [DuaApi.reducerPath]: DuaApi.reducer,
  [QuizApi.reducerPath]: QuizApi.reducer,
  [ArticleApi.reducerPath]: ArticleApi.reducer,
  [QuestionApi.reducerPath]: QuestionApi.reducer,
  [FaqApi.reducerPath]: FaqApi.reducer,
  [IslamicBooksApi.reducerPath]: IslamicBooksApi.reducer,
  categorySlice: categoryIdReducer,
});

export default rootReducer;
