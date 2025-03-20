// src/routes/index.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, LoginPage, ErrorPage, UsersPage, UserFoldersPage, FoldersPage } from '@/pages';
import { PrivateRoute } from './PrivateRoute';
import { useAuth } from '@/context/AuthContext';
//import Login from '../pages/Login';
//import ErrorPage from '../pages/ErrorPage';
//import PrivateRoute from './PrivateRoute'; // Componente para proteger rutas

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>

      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */} 
          <Route path="/dashboard/users" element={<UsersPage />} />
          <Route path="/dashboard/user-folders" element={<UserFoldersPage />} />
          <Route path="/dashboard/folders" element={<FoldersPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>

      </Route>

      {/* Ruta para manejo de errores */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;