import { createApi } from '@reduxjs/toolkit/query/react';
import { DuaService } from '../constant';
import baseQuery from '@/init/baseQuery';

export const DuaApi = createApi({
  reducerPath: DuaService,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getDuaLatest: builder.query({
      query: () => `dua/latest`,
    }),
  }),
});

export const { useGetDuaLatestQuery } = DuaApi;
