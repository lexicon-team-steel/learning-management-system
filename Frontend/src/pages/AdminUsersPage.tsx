import { ReactElement, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';
import { IParticipant } from '../utilities/types';
import { Skeleton, Stack } from '@mui/material';
import theme from '../styles/theme';

import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import { useCrud } from '../utilities/hooks/useCrud';
import AdminPageTitle from '../components/AdminPageTitle';

const AdminUsersPage = (): ReactElement => {
  const { users } = useLoaderData();

  const { selectedItem, isEditing, handleChange, handleDelete, handleCancel } = useCrud<IParticipant>();

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <AdminPageTitle
        pageTitle="Hantera användare"
        buttonLabel="Skapa ny användare"
        buttonDisabled={isEditing}
        onButtonClick={() => handleChange({ id: '', lastName: '', firstName: '', email: '', roles: ['Student'] })}
      />
      {selectedItem && <UserForm key={selectedItem.id} user={selectedItem} onCancel={handleCancel} />}
      <Suspense fallback={<Skeleton variant="rounded" height={150} />}>
        <Await resolve={users}>
          {(users: IParticipant[]) => <UserTable users={users} onEdit={handleChange} onDelete={handleDelete} />}
        </Await>
      </Suspense>
    </Stack>
  );
};

export default AdminUsersPage;
