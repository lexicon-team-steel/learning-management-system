import { jwtDecode } from 'jwt-decode';
import { GuestUser, IUser, UserRole } from '../types';

type JwtPayload = {
  profile: string;
  name: string;
  sub: string;
  role: string;
  exp?: number;
};

const validRoles: UserRole[] = ['Teacher', 'Student'];

const decodeToken = (token: string): IUser => {
  if (!token) return GuestUser;

  const claims = jwtDecode<JwtPayload>(token);
  return {
    fullName: claims.profile,
    id: claims.sub,
    role: validRoles.includes(claims.role as UserRole) ? (claims.role as UserRole) : 'Guest',
  };
};

export default decodeToken;
