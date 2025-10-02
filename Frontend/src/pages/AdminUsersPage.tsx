import { ReactElement } from 'react';
import { useLoaderData } from 'react-router';
import { IParticipant } from '../utilities/types';
import { Stack } from '@mui/material';
import theme from '../styles/theme';

import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import { useCrud } from '../utilities/hooks/useCrud';
import AdminPageTitle from '../components/AdminPageTitle';

const AdminUsersPage = (): ReactElement => {
  const { users } = useLoaderData();

  const { items, selectedItem, isEditing, handleChange, handleDelete, handleCancel } = useCrud<IParticipant>(users);

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <AdminPageTitle
        pageTitle="Hantera användare"
        buttonLabel="Skapa ny användare"
        buttonDisabled={isEditing}
        onButtonClick={() => handleChange({ id: '', lastName: '', firstName: '', email: '', roles: ['Student'] })}
      />
      {selectedItem && <UserForm user={selectedItem} onCancel={handleCancel} />}
      <UserTable users={items} onEdit={handleChange} onDelete={handleDelete} />
    </Stack>
  );
};

export default AdminUsersPage;
