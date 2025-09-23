export type UserRole = 'Teacher' | 'Student' | 'Guest';

export interface IUser {
  fullName: string;
  id: string;
  role: UserRole;
}

export const GuestUser: IUser = {
  fullName: '',
  id: '',
  role: 'Guest',
};

export interface IAuthContext {
  user: IUser;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
