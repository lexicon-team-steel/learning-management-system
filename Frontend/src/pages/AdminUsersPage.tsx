import { ReactElement, Suspense, useState } from 'react';
import { Await, useLoaderData } from 'react-router';
import { IParticipant } from '../utilities/types';
import { Box, Button, Stack, Typography } from '@mui/material';
import theme from '../styles/theme';
import PlusIcon from '@mui/icons-material/Add';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';

const AdminUsersPage = (): ReactElement => {
  const { users } = useLoaderData();
  const [isEditingUser, setIsEditingUser] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IParticipant | null>(null);

  const handleAdd = () => {
    setIsEditingUser(true);
    setSelectedUser({ id: '', firstName: '', lastName: '', roles: [], email: '' });
  };

  const handleEdit = (user: IParticipant) => {
    setIsEditingUser(true);
    setSelectedUser(user);
  };

  const handleCancel = () => {
    setIsEditingUser(false);
    setSelectedUser(null);
  };

  const handleSubmit = (user: IParticipant) => {
    setIsEditingUser(false);
    setSelectedUser(null);
  };

  const handleDelete = (user: IParticipant) => {};

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={theme.layout.gap}>
        <Typography variant="h1">Hantera användare</Typography>
        <Button startIcon={<PlusIcon />} variant="contained" disabled={isEditingUser} onClick={handleAdd}>
          Skapa ny användare
        </Button>
      </Box>
      {isEditingUser && selectedUser && (
        <UserForm user={selectedUser} onSubmit={handleSubmit} onCancel={handleCancel} />
      )}
      <Suspense>
        <Await resolve={users}>
          {(users: IParticipant[]) => <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />}
        </Await>
      </Suspense>
    </Stack>
  );
};

export default AdminUsersPage;
