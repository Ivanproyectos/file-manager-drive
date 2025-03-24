import { axiosInstance } from "./axiosInstance";
import { ICreateFile } from "@/types";
export const createFile = async (file: ICreateFile):Promise<void> => {
   await axiosInstance.post('/files', file);

}