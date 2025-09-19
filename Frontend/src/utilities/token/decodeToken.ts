import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  profile: string;
  name: string;
  sub: string;
  role: string;
  exp?: number;
};

const decodeToken = (token: string) => {
  if (!token) return { name: '', id: '', role: '' };

  const claims = jwtDecode<JwtPayload>(token);

  const name = claims.profile ?? 'unknown';
  const id = claims.sub ?? 'unknown';
  const role = claims.role ?? 'none';

  return { name, id, role };
};

export default decodeToken;
