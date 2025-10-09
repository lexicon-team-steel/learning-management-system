import { useLocation, useNavigate } from 'react-router';

export const usePagination = (defaultPageIndex = 1, pageParamName = 'pageIndex') => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentPage = Number(searchParams.get(pageParamName) || defaultPageIndex);

  const setPage = (index: number) => {
    const params = new URLSearchParams(location.search);
    params.set(pageParamName, String(index));

    navigate({ pathname: location.pathname, search: params.toString() });
  };

  return { currentPage, setPage };
};
