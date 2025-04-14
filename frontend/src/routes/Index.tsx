// src/routes/index.tsx

import {
  Dashboard,
  ErrorPage,
  FolderManagerPage,
  FoldersPage,
  LoginPage,
  UserFoldersPage,
  UsersPage,
} from '@/pages'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard/users" element={<UsersPage />} />
          <Route path="/dashboard/user-folders" element={<UserFoldersPage />} />
          <Route path="/dashboard/folders" element={<FoldersPage />} />
          <Route
            path="/dashboard/folders/:id"
            element={<FolderManagerPage />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Route>

      {/* Ruta para manejo de errores */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default AppRoutes
