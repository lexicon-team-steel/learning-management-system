import { ReactNode, useEffect, useState } from 'react';
import { ICourse } from '../../types';
import { useAuthContext } from '../../hooks/useAuthContext';
import { CoursesContext } from './coursesContext';
import { fetchWithToken } from '../../api/fetchWithToken';
import { BASE_URL } from '../../constants';

interface ICoursesProviderProps {
  children: ReactNode;
}

export const CoursesProvider = ({ children }: ICoursesProviderProps) => {
  const { user, isLoggedIn } = useAuthContext();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);

    try {
      const data = await fetchWithToken<ICourse[]>(`${BASE_URL}/courses`);
      setCourses(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, user.role]);

  const values = { courses, loading, error, refetch: fetchCourses };

  return <CoursesContext.Provider value={values}>{children}</CoursesContext.Provider>;
};
