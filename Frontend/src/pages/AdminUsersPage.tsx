import { ReactElement, useCallback } from 'react';
import { useLoaderData } from 'react-router';
import { IForm, IPagedLoader, IParticipant, ITable } from '../utilities/types';

import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import AdminCrudPage from '../components/AdminCrudPage';
import { EMPTY_PARTICIPANT } from '../utilities/constants';
import { Pagination, Stack } from '@mui/material';
import theme from '../styles/theme';
import { usePagination } from '../utilities/hooks/usePagination';
import UserFilter from '../components/UserFilter';
import { useUserFilter } from '../utilities/hooks/useUserFilter';
const AdminUsersPage = (): ReactElement => {
  const { items, details } = useLoaderData<IPagedLoader<IParticipant>>();
  const { currentPage, setPage } = usePagination();
  const { name, role, applyFilter } = useUserFilter();

  const FormComponent = useCallback(
    ({ item, onCancel, errors }: IForm<IParticipant>) => <UserForm user={item} onCancel={onCancel} errors={errors} />,
    []
  );

  const TableComponent = useCallback(
    ({ items, onEdit, onDelete }: ITable<IParticipant>) => (
      <>
        <UserFilter initName={name} initRole={role} onSubmit={applyFilter} />
        <UserTable users={items} onEdit={onEdit} onDelete={onDelete} />
      </>
    ),
    [name, role, applyFilter]
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
      {details.totalPages > 1 && (
        <Pagination
          sx={{ marginX: 'auto' }}
          count={details.totalPages}
          page={currentPage}
          onChange={(_, index) => setPage(index)}
          color="primary"
          size="small"
        />
      )}
    </Stack>
  );
};

export default AdminUsersPage;
