import { createAppApi } from "../CreateAppApi";

export const RequestsApi = createAppApi({
  reducerPath: "requests",
  tagTypes: ["Delete", "Move"],
  endpoints: (builder) => ({
    getDropRequests: builder.query({
      query: (data) => ({
        url: "/delete-requests",
        params: data,
      }),
      providesTags: ["Delete"],
    }),
    getMoveRequests: builder.query({
      query: (data) => ({
        url: "/move-requests",
        params: data,
      }),
      providesTags: ["Move"],
    }),
    updateMoveRequest: builder.mutation({
      query: (id) => ({
        url: `/move-requests/${id}`,
        method: "PUT",
        body: { data: { isApproved: true } },
      }),
      invalidatesTags: ["Move"],
    }),
    updateDropRequest: builder.mutation({
      query: (id) => ({
        url: `/delete-requests/${id}`,
        method: "PUT",
        body: { data: { isApproved: true } },
      }),
      invalidatesTags: ["Delete"],
    }),
    deleteMoveRequest: builder.mutation({
      query: (id) => ({
        url: `/move-requests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Move"],
    }),
    deleteDropRequest: builder.mutation({
      query: (id) => ({
        url: `/delete-requests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Delete"],
    }),
  }),
});

export const {
  useGetDropRequestsQuery,
  useGetMoveRequestsQuery,
  useUpdateDropRequestMutation,
  useUpdateMoveRequestMutation,
  useDeleteDropRequestMutation,
  useDeleteMoveRequestMutation,
} = RequestsApi;
