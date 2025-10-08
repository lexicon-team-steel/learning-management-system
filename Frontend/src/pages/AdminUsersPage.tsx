import { ReactElement, useCallback } from 'react';
import { Navigate, useLoaderData, useNavigate } from 'react-router';
import { IForm, IPagedLoader, IParticipant, ITable } from '../utilities/types';

import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import AdminCrudPage from '../components/AdminCrudPage';
import { EMPTY_PARTICIPANT } from '../utilities/constants';
import { Pagination, Stack } from '@mui/material';
import theme from '../styles/theme';
import { usePagination } from '../utilities/hooks/usePagination';
import UserFilter from '../components/UserFilter';

const AdminUsersPage = (): ReactElement => {
  const { items, details } = useLoaderData<IPagedLoader<IParticipant>>();
  const { currentPage, setPage } = usePagination();
  const navigate = useNavigate();

  const url = new URL(window.location.href);
  const initialName = url.searchParams.get('name') ?? '';
  const initialRole = url.searchParams.get('role') ?? '';

  const handleFilterSubmit = useCallback(
    (name?: string, role?: string) => {
      const params = new URLSearchParams();
      if (name) params.append('name', name);
      if (role) params.append('role', role);
      params.append('page', currentPage.toString());

      navigate({ search: params.toString() });
    },
    [currentPage, navigate]
  );

  const FormComponent = useCallback(
    ({ item, onCancel, errors }: IForm<IParticipant>) => <UserForm user={item} onCancel={onCancel} errors={errors} />,
    []
  );

  const TableComponent = useCallback(
    ({ items, onEdit, onDelete }: ITable<IParticipant>) => (
      <>
        <UserFilter initName={initialName} initRole={initialRole} onSubmit={handleFilterSubmit} />
        <UserTable users={items} onEdit={onEdit} onDelete={onDelete} />
      </>
    ),
    [initialName, initialRole, handleFilterSubmit]
  );

  return (
    <Stack gap={theme.layout.gapLarge}>
      <AdminCrudPage
        items={items}
        emptyItem={EMPTY_PARTICIPANT}
        title="Hantera användare"
        buttonLabel="Skapa ny användare"
        FormComponent={FormComponent}
        TableComponent={TableComponent}
      />
      <Pagination
        sx={{ marginX: 'auto' }}
        count={details.totalPages}
        page={currentPage}
        onChange={(_, index) => setPage(index)}
        color="primary"
        size="small"
      />
    </Stack>
  );
};

export default AdminUsersPage;
