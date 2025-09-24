import { useContext } from 'react';
import { AuthContext } from '../context/auth/authContext';

export function useAuthContext() {
  const auth = useContext(AuthContext);

  const isTeacher = auth.user.role === 'Teacher';
  const isStudent = auth.user.role === 'Student';
  const hasRole = (role: string) => auth.user.role === role;

  return { isTeacher, isStudent, hasRole, ...auth };
}
