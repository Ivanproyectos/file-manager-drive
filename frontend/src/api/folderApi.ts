import { CreateFolder, ICreateSubFolder, IFile, IFolder, IFolderById, ISubFolder, UpdateFolder } from "@/types";
import { axiosInstance } from "./axiosInstance";
export const createFolderAsync = async (folder: CreateFolder): Promise<number> => {
    const response = await axiosInstance.post('/folders', folder);
    return response.data?.id;
}
export const getFoldersAsync = async (): Promise<IFolder[]> => {
    const response = await axiosInstance.get('/folders');
    return response.data;
}
export const getFolderByIdAsync = async (folderId: number): Promise<IFolderById> => {
    const response = await axiosInstance.get(`/folders/${folderId}`);
    return response.data;
}

export const getSubFoldersAsync = async (folderId: number): Promise<ISubFolder[]> => {
    const response = await axiosInstance.get(`/folders/${folderId}/subfolders`);
    return response.data;
}

export const getFilesAsync = async (folderId: number): Promise<IFile[]> => {
    const response = await axiosInstance.get(`/folders/${folderId}/files`);
    return response.data;
}
export const createSubFolder = async (folder: ICreateSubFolder): Promise<number> => {
    const response = await axiosInstance.post('/folders/subfolders', folder);
    return response.data?.id;
}

export const deleteFolder = async (folderId: number): Promise<void> => {
    await axiosInstance.delete(`/folders/${folderId}`);
}

export const UpdateNameFolder = async (folderId: number, name: string): Promise<void> => {
    const data = {
        id: folderId,
        name
    }
    await axiosInstance.patch(`/folders/${folderId}`, data);
}
export const updateStatusFolder = async (folderId: number): Promise<void> => {
    await axiosInstance.patch(`/folders/${folderId}/status`);
}

export const updateFolder = async (folder: UpdateFolder): Promise<void> => {
    await axiosInstance.put(`/folders/${folder.id}`,folder);
}

export const changeStatus = async (folderId: number, statusId: number): Promise<void> => {
    await axiosInstance.post(`folders/${folderId}/status/${statusId}`,{});
}