
import {Navigate, Outlet } from "react-router-dom";
export const PrivateRoute = () => {
    //const { authData } = useAuth();
    const isValid: boolean = true;

    if (!isValid) {
        // Redirige al login si el usuario no está autenticado
        return <Navigate to="/login" />;
      }
    
      return <Outlet />;
};
