import { ReactElement, Suspense, useEffect } from 'react';
import { Await, useActionData, useLoaderData } from 'react-router';
import { IBasicAction, IAdminUsersLoader, IParticipant } from '../utilities/types';
import { Skeleton, Stack } from '@mui/material';
import theme from '../styles/theme';

import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import { useCrud } from '../utilities/hooks/useCrud';
import AdminPageTitle from '../components/AdminPageTitle';
import { scrollTop } from '../utilities/helpers';

const AdminUsersPage = (): ReactElement => {
  const { selectedItem, isEditing, handleChange, handleDelete, handleCancel, errors, setErrors } =
    useCrud<IParticipant>();
  const { users } = useLoaderData<IAdminUsersLoader>();
  const actionData = useActionData<IBasicAction>();
  const emptyUser: IParticipant = { id: '', lastName: '', firstName: '', email: '', roles: ['Student'] };

  useEffect(() => {
    setErrors(actionData?.errors || {});
  }, [actionData, setErrors]);

  useEffect(() => {
    if (selectedItem) scrollTop();
  }, [selectedItem]);

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <AdminPageTitle
        pageTitle="Hantera användare"
        buttonLabel="Skapa ny användare"
        buttonDisabled={isEditing}
        onButtonClick={() => handleChange(emptyUser)}
      />
      {selectedItem && <UserForm key={selectedItem.id} user={selectedItem} onCancel={handleCancel} errors={errors} />}
      <Suspense fallback={<Skeleton variant="rounded" height={150} />}>
        <Await resolve={users}>
          {(users: IParticipant[]) => <UserTable users={users} onEdit={handleChange} onDelete={handleDelete} />}
        </Await>
      </Suspense>
    </Stack>
  );
};

export default AdminUsersPage;
