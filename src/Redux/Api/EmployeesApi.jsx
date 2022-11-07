import { createAppApi } from "../CreateAppApi";

export const EmployeesApi = createAppApi({
  reducerPath: "employees",
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: (data) => ({
        url: "/employees",
        params: new URLSearchParams(data),
        keepUnusedDataFor: 60,
      }),

      providesTags: ["Employees"],
    }),
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/employees",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),
    updateEmployee: builder.mutation({
      query: (data) => ({
        url: `/employees/${data.id}`,
        method: "UPDATE",
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = EmployeesApi;
