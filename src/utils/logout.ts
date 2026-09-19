// utils/logout.ts

import { logoutUser } from "@/lib/features/auth/authSlice";
import { AppDispatch } from "@/lib/store";

export const handleLogout = async (
  dispatch: AppDispatch,
  router: ReturnType<typeof import("next/navigation").useRouter> // ✅ works fine
) => {
  await dispatch(logoutUser());
  router.replace("/");
};
