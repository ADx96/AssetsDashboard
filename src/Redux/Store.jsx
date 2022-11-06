import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { AuthApi } from "./Api/AuthApi";
import { EmployeesApi } from "./Api/EmployeesApi";
import { AssetsApi } from "./Api/AssetsApi";
import authReducer from "./Features/AuthSlice";
import { RequestsApi } from "./Api/RequestApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [EmployeesApi.reducerPath]: EmployeesApi.reducer,
    [AssetsApi.reducerPath]: AssetsApi.reducer,
    [RequestsApi.reducerPath]: RequestsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      AuthApi.middleware,
      EmployeesApi.middleware,
      AssetsApi.middleware,
      RequestsApi.middleware,
    ]),
});

setupListeners(store.dispatch);
