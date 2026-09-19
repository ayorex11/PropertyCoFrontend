import { DocumentFormPayload } from "@/schemas/schema";
import { toFormData } from "@/utils/formData";
import api from "./axiosInstance";
import { Document } from "../types";

export const uploadDocumentsApi = async (data: DocumentFormPayload) => {
  const formData = toFormData(data);
  const res = await api.post(`docunment/upload-doc/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updateDocumentsApi = async (data: DocumentFormPayload) => {
  const formData = toFormData(data);
  const res = await api.patch(`docunment/update/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const fetchAgentDocumentsApi = async (): Promise<Document> => {
  const res = await api.get(`docunment/get_my_docunment/`);
  return res.data.data;
};

export const fetchAgentDocumentsByEmailApi = async (email: string): Promise<Document> => {
  const res = await api.get(`docunment/get_user_docunment/${email}/`);
  return res.data.data;
};