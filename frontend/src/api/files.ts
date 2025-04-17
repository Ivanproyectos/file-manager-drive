import { axiosInstance } from "./axiosInstance";
import { ICreateFile, IFileStorageStatus } from "@/types";
export const createFile = async (file: ICreateFile):Promise<void> => {
   await axiosInstance.post('/files', file);
}

export const downloadFile = async (fileId: number):Promise<Blob> => {
    const response = await axiosInstance.get(`/files/${fileId}/download`);
    return response.data;
}

export const deleteFile = async (fileId: number):Promise<any> => {
    await axiosInstance.delete(`/files/${fileId}`);
}

export const getFileStorageStatus = async ():Promise<IFileStorageStatus> => {
   const response = await axiosInstance.get(`/files/file-storage-status`);
   return response.data;
}