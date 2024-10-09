import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TopProductsType } from "../../types/Types";
export const fakeApi = createApi({
  reducerPath: "fakeApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query<string[], void>({
      query: () => `products/categories`,
    }),
    getProducts: builder.query<TopProductsType[], void>({
      query: () => `products`,
    }),
    getProductsByCategory: builder.query<
      TopProductsType[],
      { categoryName: string }
    >({
      query: ({ categoryName }) => `products/category/${categoryName}`,
    }),
    getProductsById: builder.query<TopProductsType[], { id: string }>({
      query: ({ id }) => `products/${id}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByIdQuery,
} = fakeApi;
