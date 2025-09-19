import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
  exp?: number;
};

const decodeToken = (token: string) => {
  if (!token) return { name: '', id: '', role: '' };

  const claims = jwtDecode<JwtPayload>(token);

  const name = claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? 'unknown';
  const id = claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ?? 'unknown';
  const role = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? 'none';

  return { name, id, role };
};

export default decodeToken;
