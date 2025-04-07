import React from 'react';
import { useAuth } from '../context/AuthContext';

interface Props {
    children: React.ReactNode;
    allowedRoles: string[];
}
export const AuthorizedForRole = ({children, allowedRoles }: Props) => {
    const { user } = useAuth();
    const userRoles = user?.roles || [];
    if(!user || !userRoles.some(role => allowedRoles.includes(role))) {
        return null;
    }

  return children;
}
