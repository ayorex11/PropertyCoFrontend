'use client'
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ProtectedRouteProps } from "@/lib/types";
import { errorToast } from "@/utils/CustomToast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { openLogin } from "@/lib/features/modal/modalSlice";
import useAuthEffect from "@/utils/useAuthEffect";

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const user = useAppSelector((state) => state.auth.user);
  const userToken = useAppSelector((state) => state.auth.access);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useAuthEffect();

  useEffect(() => {
    if (!user || !userToken) {
      dispatch(openLogin());
      router.replace("/");
      errorToast("Session terminated, please log in");
    } else if (!allowedRoles.includes(user?.account_type)) {
      router.replace("/");
      errorToast("Insufficient Permission");
    }
  }, [user, userToken, allowedRoles, router, dispatch]);

  if (!user || !userToken || !allowedRoles.includes(user?.account_type)) {
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoute;