import { createContext, useContext, useState, useEffect } from "react";
import {  User, AuthContextType  } from "@/types";
import Cookies from "js-cookie";

const AuthContext = createContext<AuthContextType | null>(null); 

export const AuthProvider = ({children}: { children: React.ReactNode}) => { 
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true); // cambiar
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken){
            setToken(storedToken);
            setIsAuthenticated((prev) => !prev);
        }
        setLoading(false);
      }, []); 

      const login = (userData: User, authToken: string) => {
       // Cookies.set('token', token, { expires: 7, path: '' });
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", authToken);
        setUser(userData);
        setToken(authToken);
      };
    
      // Función para cerrar sesión
      const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      };
    

    return (
        <AuthContext.Provider value={{ user,isAuthenticated, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}