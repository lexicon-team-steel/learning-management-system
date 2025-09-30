import { ReactElement, Suspense, useState } from 'react';
import { Await, useLoaderData } from 'react-router';
import { IParticipant } from '../utilities/types';
import Table from '../components/Table';
import UserTableRow from '../components/UserTableRow';
import { Box, Button, Stack, Typography } from '@mui/material';
import theme from '../styles/theme';
import PlusIcon from '@mui/icons-material/Add';

const newUser: IParticipant = { id: '', firstName: '', lastName: '', roles: [], email: '' };

const AdminUsersPage = (): ReactElement => {
  const { users } = useLoaderData();
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IParticipant>();

  const handleCreate = () => {
    setIsEdited(true);
    setCurrentUser(newUser);
  };

  const handleEdit = (user: IParticipant) => {
    setIsEdited(true);
    setCurrentUser(user);
  };

  const handleDelete = (user: IParticipant) => {};

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={theme.layout.gap}>
        <Typography variant="h1">Hantera användare</Typography>
        <Button startIcon={<PlusIcon />} variant="contained" disabled={isEdited} onClick={handleCreate}>
          Skapa ny användare
        </Button>
      </Box>
      {isEdited && (
        <div>
          <p>There will be a form for: ${JSON.stringify(currentUser)}</p>
          <Button variant="contained" onClick={() => setIsEdited(false)}>
            ok
          </Button>
        </div>
      )}
      <Suspense>
        <Await resolve={users}>
          {(users: IParticipant[]) => (
            <Table
              headers={['Namn', 'E-post', 'Roll', 'Åtgärder']}
              keyField="id"
              rows={users}
              renderItem={(user: IParticipant) => (
                <UserTableRow user={user} onEdit={() => handleEdit(user)} onDelete={() => handleDelete(user)} />
              )}
            ></Table>
          )}
        </Await>
      </Suspense>
    </Stack>
  );
};

export default AdminUsersPage;
