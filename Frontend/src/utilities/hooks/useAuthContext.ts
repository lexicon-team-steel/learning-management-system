import { useContext } from 'react';
import { AuthContext } from '../context/auth/authContext';

export function useAuthContext() {
  return useContext(AuthContext);
}
