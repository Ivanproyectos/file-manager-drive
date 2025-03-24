import { axiosInstance } from "./axiosInstance";
import { CreateFolder } from "@/types";
export const createFolderAsync = async (folder: CreateFolder):Promise<number> => {

   const response = await axiosInstance.post('/folders', folder);
   return response.data?.id;

}