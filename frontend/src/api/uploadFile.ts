import { axiosInstance } from './axiosInstance';

export const getUploadId = async (): Promise<String> => {
    const response = await axiosInstance.get('/upload/upload-start');
    return response.data.uploadId;
}