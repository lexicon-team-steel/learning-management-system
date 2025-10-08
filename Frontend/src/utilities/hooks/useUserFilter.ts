import { useLocation, useNavigate } from 'react-router';

export const useUserFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const name = searchParams.get('name') ?? '';
  const role = searchParams.get('role') ?? '';

  const applyFilter = (name?: string, role?: string) => {
    const params = new URLSearchParams();

    if (name) params.set('name', name);
    if (role) params.set('role', role);

    navigate({ pathname: location.pathname, search: `?${params.toString()}` });
  };

  return {
    name,
    role,
    applyFilter,
  };
};
