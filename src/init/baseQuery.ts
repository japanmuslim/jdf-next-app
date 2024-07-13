import { API_URL } from "@/contants";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    // prepareHeaders: (headers, { getState }) => {
    //     const token = getState().auth.token;
    //     if (token) {
    //         headers.set("authorization", `Bearer ${token}`);
    //     }
    //     return headers;
    // },
});

export { baseQuery };