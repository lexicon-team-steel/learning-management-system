import { ReactElement, useCallback } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router';
import { IForm, IPagedLoader, IParticipant, ITable } from '../utilities/types';

import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import AdminCrudPage from '../components/AdminCrudPage';
import { EMPTY_PARTICIPANT } from '../utilities/constants';
import { Pagination, Stack } from '@mui/material';
import theme from '../styles/theme';
import { usePagination } from '../utilities/hooks/usePagination';

const AdminUsersPage = (): ReactElement => {
  const { items, details } = useLoaderData<IPagedLoader<IParticipant>>();
  const { currentPage, setPage } = usePagination();

  const FormComponent = useCallback(
    ({ item, onCancel, errors }: IForm<IParticipant>) => <UserForm user={item} onCancel={onCancel} errors={errors} />,
    []
  );

  const TableComponent = useCallback(
    ({ items, onEdit, onDelete }: ITable<IParticipant>) => (
      <UserTable users={items} onEdit={onEdit} onDelete={onDelete} />
    ),
    []
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
        sx={{ marginLeft: 'auto' }}
        count={details.totalPages}
        defaultPage={currentPage}
        onChange={(_, index) => setPage(index)}
        variant="outlined"
        color="primary"
        size="small"
      />
    </Stack>
  );
};

export default AdminUsersPage;
