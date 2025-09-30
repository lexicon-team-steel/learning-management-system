import { ReactElement, Suspense, useState } from 'react';
import { Await, useLoaderData } from 'react-router';
import { IParticipant } from '../utilities/types';
import Table from '../components/Table';
import UserTableRow from '../components/UserTableRow';
import { Box, Button, Stack, Typography } from '@mui/material';
import theme from '../styles/theme';
import PlusIcon from '@mui/icons-material/Add';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';

const newUser: IParticipant = { id: '', firstName: '', lastName: '', roles: [], email: '' };

const AdminUsersPage = (): ReactElement => {
  const { users } = useLoaderData();
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IParticipant>(newUser);

  const handleCreate = () => {
    setIsEdited(true);
    setCurrentUser(newUser);
  };

  const handleEdit = (user: IParticipant) => {
    setIsEdited(true);
    setCurrentUser(user);
  };

  const handleDelete = (user: IParticipant) => {};
  const handleSubmit = (user: IParticipant) => {};
  const handleCancel = () => setIsEdited(false);

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={theme.layout.gap}>
        <Typography variant="h1">Hantera användare</Typography>
        <Button startIcon={<PlusIcon />} variant="contained" disabled={isEdited} onClick={handleCreate}>
          Skapa ny användare
        </Button>
      </Box>
      {isEdited && <UserForm user={currentUser} onSubmit={handleSubmit} onCancel={handleCancel} />}
      <Suspense>
        <Await resolve={users}>
          {(users: IParticipant[]) => <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />}
        </Await>
      </Suspense>
    </Stack>
  );
};

export default AdminUsersPage;
