import { authLogin, authLogout } from "@/actions";
import { authReducer } from "@/reducers/authReducer";
import { AuthContextType, IUserSession } from "@/types";
import { IUserInfoPayload } from "@/types/loginStateTypes";
import Cookies from "js-cookie";
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

const initAuth  = () => {
  const storedToken = Cookies.get("auth_token") ?? "";
  const storedUser = localStorage.getItem("user");
  const initialState: IUserInfoPayload = {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken,
    isAuthenticated: !!storedToken,
  }
  return initialState;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const [authState, dispach] = useReducer(authReducer, {}, initAuth);


  const login = (
    authToken: string,
    expiresIn: number,
    userData: IUserSession
  ) => {
    const expiresDate = new Date(expiresIn * 1000);

    Cookies.set("auth_token", authToken, { expires: expiresDate, path: "" });
    localStorage.setItem("user", JSON.stringify(userData));

    const data = {
      user: userData,
      token: authToken, 
      isAuthenticated: true
    }
    dispach(authLogin(data));
  };


  const logout = () => {
    Cookies.remove("auth_token");
    localStorage.removeItem("user");

    const data = {
      user: null,
      token: null, 
      isAuthenticated: false
    }
    dispach(authLogout(data));
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
