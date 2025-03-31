import axios from 'axios';
import { ILogin, IUserToken} from "@/types";

export const loginAsync = async (user: ILogin): Promise<IUserToken> => {
   const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/account/auth`, user);
   return response.data;
}