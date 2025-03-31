import { createContext, useContext, useState, useEffect } from "react";
import { IUserSession, AuthContextType } from "@/types";
import Cookies from "js-cookie";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUserSession | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // cambiar
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = Cookies.get("auth_token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated((prev) => !prev);
      if (!localStorage.getItem("user")) return;
      setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
    setLoading(false);
  }, []);

  const login = (
    authToken: string,
    expiresIn: number,
    userData: IUserSession
  ) => {
    const expiresDate = new Date(expiresIn * 1000);
    debugger;
    Cookies.set("auth_token", authToken, { expires: expiresDate, path: "" });
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    Cookies.remove("auth_token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, token, login, logout, loading }}
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
