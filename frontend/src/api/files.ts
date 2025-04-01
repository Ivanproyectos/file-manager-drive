import { axiosInstance } from "./axiosInstance";
import { ICreateFile } from "@/types";
export const createFile = async (file: ICreateFile):Promise<void> => {
   await axiosInstance.post('/files', file);
}

export const downloadFile = async (fileId: number):Promise<Blob> => {
    const response = await axiosInstance.get(`/files/${fileId}/download`);
    return response.data;
}