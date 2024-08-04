import { createApi} from '@reduxjs/toolkit/query/react'
import { TafseerService } from '../constant'
import baseQuery from './https'

export const TafseerApi = createApi({
  reducerPath: TafseerService,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTafseerLatest: builder.query({
        query: () => `tafseer-video/latest`,
    })
  }),
})

export const { useGetTafseerLatestQuery } = TafseerApi