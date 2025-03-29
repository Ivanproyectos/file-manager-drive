import { axiosInstance } from "./axiosInstance";
import { ISubFolder } from "@/types";


export const getUserFolders = async (folderId: number): Promise<ISubFolder[]> => {
    const response = await axiosInstance.get(`/users/folders/${folderId}`);
    return response.data;
}