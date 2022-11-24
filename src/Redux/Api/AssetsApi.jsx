import { createAppApi } from "../CreateAppApi";

export const AssetsApi = createAppApi({
  reducerPath: "assets",
  tagTypes: ["Assets"],
  endpoints: (builder) => ({
    getAssets: builder.query({
      query: (query) => ({
        url: "/assets",
        params: query,
      }),
      providesTags: ["Assets"],
    }),
    createAsset: builder.mutation({
      query: (data) => ({
        url: "/assets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Assets"],
    }),
    updateAsset: builder.mutation({
      query: (Update) => ({
        url: `/assets/${Update.id}`,
        method: "PUT",
        body: { data: { ...Update.row } || Update.employee },
      }),
      invalidatesTags: ["Assets"],
    }),
    deleteAsset: builder.mutation({
      query: (id) => ({
        url: `/assets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assets"],
    }),
    getAsset: builder.query({
      query: (Serial) => ({
        url: `/assets/`,
        params: Serial,
      }),
      transformResponse: (responseData) => {
        const id = responseData.data[0].attributes.employee.data.id;
        return id;
      },
      providesTags: ["Assets"],
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useGetAssetQuery,
  useCreateAssetMutation,
  useUpdateAssetMutation,
  useDeleteAssetMutation,
} = AssetsApi;
