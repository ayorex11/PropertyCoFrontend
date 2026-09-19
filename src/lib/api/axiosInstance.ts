// src/lib/api/axiosInstance.ts
import axios from "axios";
import type { Store } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { loginUser, logoutUser } from "../features/auth/authSlice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const attachAuthInterceptors = (store: Store<RootState>) => {
  api.interceptors.request.use((config) => {
    const token = store.getState().auth.access;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      const { refresh, user, refresh_expiration, access_expiration } =
        store.getState().auth;

      if (
        error.response?.status === 401 &&
        refresh &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/token/refresh/`,
            { refresh: refresh }
          );

          store.dispatch(
            loginUser({
              access: data.access,
              refresh,
              user,
              access_expiration,
              refresh_expiration,
            })
          );
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch (err) {
          store.dispatch(logoutUser());
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default api;