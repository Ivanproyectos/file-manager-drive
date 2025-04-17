import { axiosInstance } from "./axiosInstance";
import { IFolderProcessState } from "@/types"

export const getFolderProcessStatus = async (): Promise<IFolderProcessState[]> => {
    const response = await axiosInstance.get(`/folders/status-process`);
    return response.data;
}