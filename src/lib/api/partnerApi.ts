import { PartnerFormPayload } from "@/schemas/schema";
import api from "./axiosInstance";

export const partnerRequestApi = async (data: PartnerFormPayload) => {
  const res = await api.post(`messages/admin_send_message/`, data);
  return res.data.data;
};