import { createApi } from '@reduxjs/toolkit/query/react';
import { TafseerService } from '../constant';
import baseQuery from '@/init/baseQuery';

export const TafseerApi = createApi({
  reducerPath: TafseerService,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getSurah: builder.query({
      query: () => `surah`,
    }),
    getJuz: builder.query({
      query: () => `juz`,
    }),
    getTafseerLatest: builder.query({
      query: () => `tafseer-video/latest`,
    }),
  }),
});

export const { useGetTafseerLatestQuery } = TafseerApi;
