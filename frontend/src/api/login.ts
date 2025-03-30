import { axiosInstance } from "./axiosInstance";
import { ILogin, IUserToken} from "@/types";

export const loginAsync = async (user: ILogin): Promise<IUserToken> => {
   const response = await axiosInstance.post('/account/auth', user);
   return response.data;
}