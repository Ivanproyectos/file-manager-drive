export interface User {
    id: number;
    name: string;
  }
  
  export interface AuthContextType {
    isAuthenticated : boolean;
    user: User | null;
    token: string | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    loading: boolean;
  }