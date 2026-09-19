import { Member } from '../types';
import api from './axiosInstance';

export const fetchMembersApi = async (): Promise<Member[]> => {
  const res = await api.get('Users/get_all_users/');
  return res.data.data;
};

export const fetchAgentsApi = async (): Promise<Member[]> => {
  const res = await api.get('Users/get_all_agents/');
  return res.data.data;
};

export const fetchUsersApi = async (): Promise<Member[]> => {
  const res = await api.get('Users/get_all_nonagents/');
  return res.data.data;
};

export const fetchUserDetailsApi = async (email: string) => {
  const res = await api.get(`Users/get_user_by_email/${email}/`);
  return res.data;
}

export const fetchAgentDetailsApi = async (email: string) => {
  const res = await api.get(`agent/get_agent_by_email/${email}/`);
  return res.data.data;
}