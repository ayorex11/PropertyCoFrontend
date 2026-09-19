import { adminMessagePayload, agentMessagePayload } from '@/schemas/schema';
import { AdminMessageDetail, Message, MessageDetail } from '../types';
import api from './axiosInstance';

export const fetchAdminMessagesApi = async (): Promise<Message[]> => {
  const res = await api.get('messages/get_messages/');
  return res.data.data;
};

export const readAdminMessageApi = async (id: string): Promise<AdminMessageDetail> => {
  const res = await api.get(`messages/read_message/${id}/`);
  return res.data;
};

export const markReadAdminMessageApi = async (id: string) => {
  const res = await api.post(`messages/mark_as_read/${id}/`);
  return res.data.data;
};

export const sendAdminMessageApi = async (data: adminMessagePayload) => {
  const res = await api.post(`messages/admin_send_message/`, data);
  return res.data.data;
};

//Agent & User
export const fetchAgentMessagesApi = async (): Promise<Message[]> => {
  const res = await api.get('messages/UsersGetMessages');
  return res.data.data;
};

export const readAgentMessageApi = async (id: string): Promise<MessageDetail> => {
  const res = await api.get(`messages/user_read_message/${id}/`);
  return res.data.data;
};

export const markReadAgentMessageApi = async (id: string) => {
  const res = await api.post(`messages/user_mark_as_read/${id}/`);
  return res.data.data;
};

export const sendAgentMessageApi = async (data: agentMessagePayload) => {
  const res = await api.post(`messages/send_message/`, data);
  return res.data.data;
};