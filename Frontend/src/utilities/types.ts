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

export interface IParticipant {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole[];
  email: string;
}

export interface IButtonConfig {
  text: string;
  link: string;
}

export interface ICourse {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  modules?: IModule[];
}

export interface IModule {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  activities: IActivity[];
  courseName: string;
}

export interface ICourseLoader {
  course: Promise<ICourse>;
  participants: Promise<IParticipant[]>;
}

export interface IActivityType {
  id: string;
  name: string;
}

export interface IActivity {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  activityType: IActivityType;
}

export interface IModule {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  activities: IActivity[];
}

export interface ICourse {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  modules?: IModule[];
}

export interface ICourseLoader {
  course: Promise<ICourse>;
  participants: Promise<IParticipant[]>;
}

export interface ICoursesLoader {
  courses: Promise<ICourse[]>;
}

export interface IDashboardLoader {
  courses: Promise<ICourse[]>;
  activities: Promise<IActivity[]>;
}

export interface IModuleLoader {
  module: Promise<IModule>;
  activities: Promise<IActivity[]>;
}

export interface ICoursesContext {
  courses: ICourse[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
