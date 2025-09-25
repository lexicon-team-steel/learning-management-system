export type ActivityType = 'Lecture' | 'Workshop' | 'Assignment' | 'Exam' | 'Other';

export interface IActivity {
  id: number;
  type: ActivityType;
  name: string;
  description: string;
  date: string;
  timeStart: string;
  timeEnd?: string;
}

export interface ICourse {
  id: number;
  course: string;
  info: string;
  dateStart: string; // YYYY-MM-DD
  dateEnd?: string; // optional
  activities: IActivity[];
}

export interface IUser {
  firstName: string;
  lastName: string;
}
export const mockUser: IUser = {
  firstName: 'Anna',
  lastName: 'Anderson',
};

// mockCourse.ts

export const mockCourse: ICourse = {
  id: 1,
  course: 'Webbutvecklare .NET',
  info: 'Fullstack-utbildning med fokus på C#, .NET och React.',
  dateStart: '2025-01-15',
  dateEnd: '2025-06-15',
  activities: [
    {
      id: 101,
      type: 'Lecture',
      name: 'Introduktion till kursen',
      description: 'Genomgång av kursupplägg och mål.',
      date: '2025-01-15',
      timeStart: '09:00',
      timeEnd: '10:30',
    },
    {
      id: 102,
      type: 'Workshop',
      name: 'Grundläggande C#',
      description: 'Praktisk övning i C# syntax och datatyper.',
      date: '2025-01-16',
      timeStart: '13:00',
      timeEnd: '16:00',
    },
    {
      id: 103,
      type: 'Assignment',
      name: 'Inlämningsuppgift 1',
      description: 'Skapa ett konsolprogram i C# som hanterar en lista med studenter.',
      date: '2025-01-20',
      timeEnd: '23:59',
      timeStart: '16:00',
    },
  ],
};
