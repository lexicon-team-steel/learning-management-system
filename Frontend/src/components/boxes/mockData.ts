export interface ICourseBoxData {
  title: string;
  course: string;
  info: string;
  dateStart: string;
  dateEnd?: string;
}
export interface IUser {
  firstName: string;
  lastName: string;
}
export const mockUser: IUser = {
  firstName: 'Anna',
  lastName: 'Anderson',
};
export const mockCourse: ICourseBoxData = {
  title: 'Min kurs',
  course: 'Webbutvecklare .NET',
  info: 'Fullstack-utbildning med fokus på C#, .NET och React.',
  dateStart: '2025-01-15',
  dateEnd: '2025-06-15',
};
