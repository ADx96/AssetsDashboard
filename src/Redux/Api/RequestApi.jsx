import { createAppApi } from "../CreateAppApi";

export const RequestsApi = createAppApi({
  reducerPath: "requests",
  tagTypes: ["Delete", "Move"],
  endpoints: (builder) => ({
    getCancelRequests: builder.query({
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
  }),
});

export const {
  useGetCancelRequestsQuery,
  useGetMoveRequestsQuery,
  useUpdateMoveRequestMutation,
} = RequestsApi;
