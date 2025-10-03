export interface IUser {
  fullName: string;
  id: string;
  role: UserRole;
}

export type UserRole = 'Teacher' | 'Student' | 'Guest';

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
  roles: UserRole[];
  email: string;
}

export interface IButtonConfig {
  text: string;
  link: string;
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

export interface IActivity {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  activityType: IActivityType;
}

export interface IActivityType {
  id: string;
  name: string;
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

export interface IAdminUsersLoader {
  users: Promise<IParticipant[]>;
}

export type FormErrorType = Record<string, string>;

export type ApiErrorType = {
  fieldErrors?: FormErrorType;
  generalError?: string;
};

export interface IBasicAction {
  errors?: FormErrorType;
}
