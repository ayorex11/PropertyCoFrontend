import { toFormData } from "@/utils/formData";
import api from "./axiosInstance";
import { agentProfilePayload, userProfilePayload } from "@/schemas/schema";
import { Agent, UserProfile } from "../types";

export const fetchAgentProfileApi = async (): Promise<Agent> => {
  const res = await api.get("agent/view/");
  return res.data.data;
};

export const updateAgentProfileApi = async (data: agentProfilePayload) => {
  const formData = toFormData(data);
  const res = await api.patch(`agent/update/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const fetchUserProfileApi = async (): Promise<UserProfile> => {
  const res = await api.get("users/view/");
  return res.data.data;
};

export const updateUserProfileApi = async (data: userProfilePayload) => {
  const formData = toFormData(data);
  const res = await api.patch(`users/update/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};
