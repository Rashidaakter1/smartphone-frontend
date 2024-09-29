import { baseApi } from "../../api/baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: () => ({
        url: "/sales",
        method: "GET",
      }),
      providesTags: ["sales", "product"],
    }),
    getSalesById: builder.query({
      query: (id) => ({
        url: `/sales/${id}`,
        method: "GET",
      }),
      providesTags: ["sales", "product"],
    }),
    createSales: builder.mutation({
      query: (data) => ({
        url: "/sales/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sales", "product"],
    }),
    updateSales: builder.mutation({
      query: (data) => ({
        url: `/sales/${data.id}`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["sales", "product"],
    }),
    deleteSales: builder.mutation({
      query: (id) => ({
        url: `/sales/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sales", "product"],
    }),
  }),
});

export const {
  useCreateSalesMutation,
  useDeleteSalesMutation,
  useUpdateSalesMutation,
  useGetSalesByIdQuery,
  useGetSalesQuery,
} = salesApi;
