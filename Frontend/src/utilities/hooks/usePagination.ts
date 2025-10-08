import { useNavigate, useSearchParams } from 'react-router';

export const usePagination = (defaultPage = 1) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('pageIndex')) || defaultPage;

  const setPage = (index: number) => {
    navigate(`?pageIndex=${index}`);
  };

  return { currentPage, setPage };
};
