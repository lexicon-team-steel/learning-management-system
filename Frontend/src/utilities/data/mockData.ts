export interface IActivity {
  id: number;
  type: 'Lecture' | 'Workshop' | 'Assignment' | 'Exam' | 'Other';
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
  modules: [
    {
      id: 111,
      name: 'C# Grundkurs',
      description: 'Introduktion till programmering med C# och .NET',
      dateStart: new Date('2025-08-18'),
      dateEnd: new Date('2025-09-30'),
    },
    {
      id: 112,
      name: 'OOP & Designmönster',
      description: 'Objektorienterad programmering och designprinciper i C#',
      dateStart: new Date('2025-10-01'),
      dateEnd: new Date('2025-11-15'),
    },
    {
      id: 113,
      name: 'Databaser & EF Core',
      description: 'SQL, databasteknik och Entity Framework Core',
      dateStart: new Date('2025-11-16'),
      dateEnd: new Date('2026-01-15'),
    },
    {
      id: 114,
      name: 'Webbutveckling med ASP.NET Core',
      description: 'Bygga moderna webbapplikationer med MVC och Web API',
      dateStart: new Date('2026-01-16'),
      dateEnd: new Date('2026-03-15'),
    },
    {
      id: 115,
      name: 'Frontend & React',
      description: 'Frontendutveckling med JavaScript, TypeScript och React',
      dateStart: new Date('2026-03-16'),
      dateEnd: new Date('2026-05-15'),
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
