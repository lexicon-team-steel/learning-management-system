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

export interface IStudent {
  id: string;
  fullName: string;
  email: string;
}

export interface IParticipantLoader {
  participants: Promise<IStudent[]>;
}

export interface ICourse {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  modules?: IModule[];
}

export interface IDashboardLoader {
  course: Promise<ICourse>;
}

export interface IModule {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface ICourseModulesLoader {
  course: Promise<ICourse>;
}

export interface ICourseLoader {
  course: Promise<ICourse>;
  participants: Promise<IStudent[]>;
}
