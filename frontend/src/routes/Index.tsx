// src/routes/index.tsx

import { Routes, Route } from 'react-router-dom';
import { Dashboard, Login, ErrorPage, User, UserFoldersPage, FoldersPage } from '@/pages';
import { PrivateRoute } from './PrivateRoute';
//import Login from '../pages/Login';
//import ErrorPage from '../pages/ErrorPage';
//import PrivateRoute from './PrivateRoute'; // Componente para proteger rutas

export const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */} 
          <Route path="/dashboard/user" element={<User />} />
          <Route path="/dashboard/user-folders" element={<UserFoldersPage />} />
          <Route path="/dashboard/folders" element={<FoldersPage />} />
        </Route>

      </Route>

      {/* Ruta para manejo de errores */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;