import { axiosInstance } from "./axiosInstance";
export const createFolder = async () => {

    axiosInstance.post('/folders');

}