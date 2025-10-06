// import { fetchWithToken } from '../api/fetchWithToken';
// import { BASE_URL } from '../constants';
import { requireTeacherRole } from '../helpers';
import { IModulesLoader } from '../types';

export const adminModulesLoader = (): IModulesLoader => {
  requireTeacherRole();
  return {
    modules: Promise.resolve([
      {
        id: '123',
        name: 'Lexicon',
        description: 'Lexiconkurs',
        startDate: '2024-10-01',
        endDate: '2024-10-31',
        activities: [],
        courseName: 'Kursnamn',
      },
      {
        id: '1234',
        name: 'LTU',
        description: 'LTUkurs',
        startDate: '2024-10-01',
        endDate: '2024-10-31',
        activities: [],
        courseName: 'Kursnamn',
      },
    ]),
  };
};
