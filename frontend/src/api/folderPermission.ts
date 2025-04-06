import { axiosInstance } from "./axiosInstance";
import { IFolderPermission } from "@/types"

export const getFolderPermission = async (folderId: number): Promise<IFolderPermission[]> => {
    const response = await axiosInstance.get(`/folder-permissions/${folderId}`);
    return response.data;
}