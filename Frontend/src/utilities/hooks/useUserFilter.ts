import { useLocation, useNavigate } from 'react-router';

export const useUserFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const name = searchParams.get('name') ?? '';
  const role = searchParams.get('role') ?? '';
  const courseId = searchParams.get('courseId') ?? '';

  const applyFilter = (name?: string, role?: string, courseId?: string) => {
    const params = new URLSearchParams();
    if (name) params.set('name', name);
    if (role) params.set('role', role);
    if (courseId) params.set('courseId', courseId);

    navigate({ pathname: location.pathname, search: `?${params.toString()}` });
  };

  const resetFilter = () => {
    navigate({ pathname: location.pathname });
  };

  return {
    name,
    role,
    courseId,
    applyFilter,
    resetFilter,
  };
};
