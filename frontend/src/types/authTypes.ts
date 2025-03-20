export interface IUserToken {
    id: number;
    name: string;
  }
  
  export interface AuthContextType {
    isAuthenticated : boolean;
    user: IUserToken | null;
    token: string | null;
    login: (userData: IUserToken, token: string) => void;
    logout: () => void;
    loading: boolean;
  }