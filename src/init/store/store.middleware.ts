import { ArticleApi } from '@/services/api/articleService';
import { DuaApi } from '@/services/api/duaService';
import { FaqApi } from '@/services/api/faqService';
import { HomeApi } from '@/services/api/homeService';
import { QuestionApi } from '@/services/api/questionService';
import { QuizApi } from '@/services/api/quizService';
import { TafseerApi } from '@/services/api/tafseerService';
import { Middleware } from 'redux';

const middlewares: Middleware[] = [
  HomeApi.middleware,
  TafseerApi.middleware,
  DuaApi.middleware,
  QuizApi.middleware,
  ArticleApi.middleware,
  QuestionApi.middleware,
  FaqApi.middleware,
];

export default middlewares;
