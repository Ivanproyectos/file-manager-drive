import { axiosInstance } from "./axiosInstance";
import { ISubFolder, IUserFile } from "@/types";


export const getUserSubfolders = async (folderId: number): Promise<ISubFolder[]> => {
    const response = await axiosInstance.get(`/users/folders/${folderId}/subfolders`);
    return response.data;
}

export const getUserFiles = async (folderId: number): Promise<IUserFile[]> => {
    const response = await axiosInstance.get(`/users/folders/${folderId}/files`);
    return response.data;
}
export const getUserFolders = async (): Promise<ISubFolder[]> => {
    const response = await axiosInstance.get(`/users/folders`);
    return response.data;
}