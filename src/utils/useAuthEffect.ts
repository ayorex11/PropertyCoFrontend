"use client";

import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { scheduleTokenRefresh } from "./tokenRefreshManager";
import { RootState } from "@/lib/store";

const useAuthEffect = () => {
  const { access_expiration, refresh } = useAppSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    scheduleTokenRefresh();
  }, [access_expiration, refresh]);
};

export default useAuthEffect;
