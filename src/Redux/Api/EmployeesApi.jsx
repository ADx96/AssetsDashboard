import { createAppApi } from "../CreateAppApi";

export const EmployeesApi = createAppApi({
  reducerPath: "employees",
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: (data) => ({
        url: "/employees",
        params: data,
      }),
      providesTags: ["Employees"],
    }),
    getEmployeeById: builder.query({
      query: (data) => ({
        url: `/employees/${data.id}`,
        params: data,
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
      query: (Update) => ({
        url: `/employees/${Update.editingKey}`,
        method: "PUT",
        body: { data: { ...Update.row } },
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
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = EmployeesApi;
