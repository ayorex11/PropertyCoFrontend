import dayjs from "dayjs";
import { loginUser, logoutUser } from "@/lib/features/auth/authSlice";
import { store } from "@/lib/store";
import { refreshTokenApi } from "@/lib/api/authApi";

let refreshTimeout: NodeJS.Timeout | null = null;

export const scheduleTokenRefresh = () => {
  const state = store.getState().auth;
  const { access_expiration, refresh } = state;

  if (!access_expiration || !refresh) return;

  const expiryTime = dayjs(access_expiration).valueOf();
  const now = Date.now();
  const refreshDelay = expiryTime - now - 30_000;

  if (refreshDelay <= 0) {
    refreshToken();
    return;
  }

  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }

  refreshTimeout = setTimeout(() => {
    refreshToken();
  }, refreshDelay);
};

const refreshToken = async () => {
  const { refresh, user, refresh_expiration } = store.getState().auth;

  try {
    const { data } = await refreshTokenApi(refresh!);

    store.dispatch(
      loginUser({
        access: data.access,
        access_expiration: data.access_expiration,
        refresh, // still valid
        user,          // keep previous user
        refresh_expiration,
      })
    );

    scheduleTokenRefresh(); // schedule next refresh
  } catch (error) {
    console.error("Refresh token failed:", error);
    store.dispatch(logoutUser());
  }
};
