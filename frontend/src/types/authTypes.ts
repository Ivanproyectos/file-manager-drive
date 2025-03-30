import { IUserSession } from "./loginTypes";
  export interface AuthContextType {
    isAuthenticated : boolean;
    user: IUserSession | null;
    token: string | null;
    login: (token: string, user: IUserSession) => void;
    logout: () => void;
    loading: boolean;
  }