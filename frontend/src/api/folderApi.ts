import { axiosInstance } from "./axiosInstance";
import { CreateFolder, IFolder} from "@/types";
export const createFolderAsync = async (folder: CreateFolder):Promise<number> => {

   const response = await axiosInstance.post('/folders', folder);
   return response.data?.id;

}

export const getFoldersAsync = async ():Promise<IFolder[]> => {  
    const response = await axiosInstance.get('/folders');
    return response.data;
}