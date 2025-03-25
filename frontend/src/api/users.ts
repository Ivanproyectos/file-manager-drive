import { axiosInstance } from './axiosInstance';
import { IUserSummary, IUser } from '@/types';

export const getUsersSummary = async (): Promise<IUserSummary[]> => {
    const response = await axiosInstance.get('/users/summary');
    return response.data;
}

export const getUsers = async (): Promise<IUser[]> => {
    const response = await axiosInstance.get('/users');
    return response.data;
}