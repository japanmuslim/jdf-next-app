import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api',
}); 

export default baseQuery;