import { DuaApi } from '@/services/api/duaService';
import { TafseerApi } from '@/services/api/tafseerService';
import { Middleware } from 'redux';

const middlewares: Middleware[] = [
    TafseerApi.middleware,
    DuaApi.middleware,
];

export default middlewares;