import { IParticipant } from '../types';

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
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  activities: IActivity[];
  modules: IModule[];
}

export interface IModule {
  id: number;
  name: string;
  description: string;
  dateStart: Date;
  dateEnd?: Date;
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
  name: 'Webbutvecklare .NET',
  description: 'Fullstack-utbildning med fokus på C#, .NET och React.',
  startDate: '2025-01-15',
  endDate: '2025-06-15',
  activities: [
    {
      id: 101,
      type: 'Lecture',
      name: 'Introduktion till kursen',
      description: 'Genomgång av kursupplägg och mål.',
      date: '2025-01-15',
      startTime: '09:00',
      endTime: '10:30',
    },
    {
      id: 102,
      type: 'Workshop',
      name: 'Grundläggande C#',
      description: 'Praktisk övning i C# syntax och datatyper.',
      date: '2025-01-16',
      startTime: '13:00',
      endTime: '16:00',
    },
    {
      id: 103,
      type: 'Assignment',
      name: 'Inlämningsuppgift 1',
      description: 'Skapa ett konsolprogram i C# som hanterar en lista med studenter.',
      date: '2025-01-20',
      endTime: '23:59',
      startTime: '16:00',
    },
  ],
  modules: [
    {
      id: '111',
      name: 'C# Grundkurs',
      description: 'Introduktion till programmering med C# och .NET',
      startDate: '2025-08-18',
      endDate: '2025-09-30',
    },
    {
      id: '112',
      name: 'OOP & Designmönster',
      description: 'Objektorienterad programmering och designprinciper i C#',
      startDate: '2025-10-01',
      endDate: '2025-11-15',
    },
    {
      id: '113',
      name: 'Databaser & EF Core',
      description: 'SQL, databasteknik och Entity Framework Core',
      startDate: '2025-11-16',
      endDate: '2026-01-15',
    },
    {
      id: '114',
      name: 'Webbutveckling med ASP.NET Core',
      description: 'Bygga moderna webbapplikationer med MVC och Web API',
      startDate: '2026-01-16',
      endDate: '2026-03-15',
    },
    {
      id: '115',
      name: 'Frontend & React',
      description: 'Frontendutveckling med JavaScript, TypeScript och React',
      startDate: '2026-03-16',
      endDate: '2026-05-15',
    },
  ],
};

export const mockCourses: ICourse[] = [
  {
    id: 1,
    name: 'Course 1',
    description: 'Den här kursen kommer lära dig allt som går att lära',
    startDate: '2025-11-16',
    endDate: '2026-01-15',
    activities: [],
    modules: [],
  },
  {
    id: 2,
    name: 'Course 1',
    description: 'Den här kursen kommer lära dig allt som går att lära',
    startDate: '2025-11-16',
    endDate: '2026-01-15',
    activities: [],
    modules: [],
  },
  {
    id: 3,
    name: 'Course 1',
    description: 'Den här kursen kommer lära dig allt som går att lära',
    startDate: '2025-11-16',
    endDate: '2026-01-15',
    activities: [],
    modules: [],
  },
  {
    id: 4,
    name: 'Course 1',
    description: 'Den här kursen kommer lära dig allt som går att lära',
    startDate: '2025-11-16',
    endDate: '2026-01-15',
    activities: [],
    modules: [],
  },
  {
    id: 5,
    name: 'Course 1',
    description: 'Den här kursen kommer lära dig allt som går att lära',
    startDate: '2025-11-16',
    endDate: '2026-01-15',
    activities: [],
    modules: [],
  },
  {
    id: 6,
    name: 'Course 1',
    description: 'Den här kursen kommer lära dig allt som går att lära',
    startDate: '2025-11-16',
    endDate: '2026-01-15',
    activities: [],
    modules: [],
  },
  {
    id: 7,
    name: 'Course 1',
    description: 'Den här kursen kommer lära dig allt som går att lära',
    startDate: '2025-11-16',
    endDate: '2026-01-15',
    activities: [],
    modules: [],
  },
];

export const mockUsers: IParticipant[] = [
  {
    id: '7c4d7d64-9b58-4b7c-8dd6-2c5bfb5f99aa',
    lastName: 'Andersson',
    firstName: 'Maria',
    email: 'maria.andersson@example.com',
    role: ['Student'],
  },
  {
    id: '1e8f326a-5f3b-4a65-8cb5-8d2c18ef7c8e',
    lastName: 'Johansson',
    firstName: 'Erik',
    email: 'erik.johansson@example.com',
    role: ['Teacher'],
  },
  {
    id: '3d92f477-4af7-4b6f-bdc5-94b1c64a28f1',
    lastName: 'Nilsson',
    firstName: 'Emma',
    email: 'emma.nilsson@example.com',
    role: ['Student'],
  },
  {
    id: 'bafabfd2-65cd-4e57-9e71-85734db8e90d',
    lastName: 'Svensson',
    firstName: 'Karl',
    email: 'karl.svensson@example.com',
    role: ['Teacher'],
  },
  {
    id: 'c4caa0f1-1d63-4b5a-baae-2d7e3c4e3265',
    lastName: 'Berg',
    firstName: 'Lisa',
    email: 'lisa.berg@example.com',
    role: ['Student'],
  },
];
