import { axiosInstance } from './axiosInstance';
import { IUserSummary } from '@/types';

export const getUsers = async (): Promise<IUserSummary[]> => {
    const response = await axiosInstance.get('/users/summary');
    return response.data;
}