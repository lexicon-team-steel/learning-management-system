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

export interface ICourse {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  activities: IActivity[];
  modules: IModule[];
}
export interface IActivity {
  id: number;
  type: ActivityType;
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime?: string;
}

export type ActivityType = 'Lecture' | 'Workshop' | 'Assignment' | 'Exam' | 'Other';

export interface IModule {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  activities: IActivity[];
}

export interface IParticipant {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole[];
  email: string;
}

export interface ICoursesLoader {
  courses: Promise<ICourse>;
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

export interface IModuleLoader {
  module: Promise<IModule>;
  activities: Promise<IActivity[]>;
}
