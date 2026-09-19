import { Notification } from '../types';
import api from './axiosInstance';

export const fetchAdminNotificationsApi = async (): Promise<Notification[]> => {
  const res = await api.get('Notifications/notifications/');
  return res.data.data;
};

export const fetchAgentNotificationsApi = async (): Promise<Notification[]> => {
  const res = await api.get('Notifications/agentnotifications/');
  return res.data.data;
};

export const readAdminNotificationApi = async (id: string): Promise<Notification> => {
  const res = await api.patch(`Notifications/read/${id}/`);
  return res.data.data;
};

export const readAgentNotificationApi = async (id: string): Promise<Notification> => {
  const res = await api.patch(`Notifications/mark_read/${id}/`);
  return res.data.data;
};