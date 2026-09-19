import { RatingFormPayload } from "@/schemas/schema";
import { toFormData } from "@/utils/formData";
import api from "./axiosInstance";
import { RatingHistory } from "../types";

export const changeRatingApi = async (data: RatingFormPayload) => {
  const formData = toFormData(data);
  const res = await api.patch(`agent/update_agent_rating/${data?.member_id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const fetchRatingHistoryApi = async (email: string): Promise<RatingHistory[]> => {
  const res = await api.get(`rating_history/get_history/${email}/`);
  return res.data.data;
};