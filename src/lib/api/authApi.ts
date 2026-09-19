import axios from "@/lib/api/axiosInstance";
import { LoginPayload, RegisterPayload, UpdatePasswordPayload } from "@/schemas/authSchema";

export const signupApi = async (data: RegisterPayload) => {
  const res = await axios.post("registration/", data);
  return res.data;
};

export const loginApi = async (data: LoginPayload) => {
  const res = await axios.post("auth/login/", data);
  return res.data;
};

export const verifyTokenApi = async (token: string) => {
  const res = await axios.post('/auth/token/verify/', {token});
  return res.data;
}

export const refreshTokenApi = async (refresh: string) => {
  const res = await axios.post('/auth/token/refresh/', {refresh});
  return res.data;
}

export const updatePaswordApi = async (data: UpdatePasswordPayload) => {
  const res = await axios.post("auth/password/change/", data);
  return res.data;
};

export const resendVerifyEmailApi = async (email: string) => {
  const res = await axios.post("registration/resend-email/", {email});
  return res.data;
}

export const verifyEmailApi = async (key: string) => {
  const res = await axios.post("registration/verify-email/", {key});
  return res.data;
}

export const verifyUserApi = async (memberid: string) => {
  const res = await axios.post(`agent/verify_user/${memberid}/`);
  return res.data.data;
};

export const unVerifyUserApi = async (memberid: string) => {
  const res = await axios.post(`agent/unverify_user/${memberid}/`);
  return res.data.data;
};