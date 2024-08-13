import { DuaApi } from '@/services/api/duaService';
import { QuizApi } from '@/services/api/quizService';
import { TafseerApi } from '@/services/api/tafseerService';
import { Middleware } from 'redux';

const middlewares: Middleware[] = [
  TafseerApi.middleware,
  DuaApi.middleware,
  QuizApi.middleware,
];

export default middlewares;
