import { ReactElement, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';
import { IParticipant } from '../utilities/types';
import Table from '../components/Table';
import UserTableRow from '../components/UserTableRow';
import { Box, Button, Stack, Typography } from '@mui/material';
import theme from '../styles/theme';
import PlusIcon from '@mui/icons-material/Add';

const AdminUsersPage = (): ReactElement => {
  const { users } = useLoaderData();
  const handleAction = (user: IParticipant) => console.log(user);

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={theme.layout.gap}>
        <Typography variant="h1">Hantera användare</Typography>
        <Button startIcon={<PlusIcon />} variant="contained">
          Skapa ny användare
        </Button>
      </Box>
      <Suspense>
        <Await resolve={users}>
          {(users: IParticipant[]) => (
            <Table
              headers={['Namn', 'E-post', 'Roll', 'Åtgärder']}
              keyField="id"
              rows={users}
              renderItem={(user: IParticipant) => (
                <UserTableRow user={user} onEdit={() => handleAction(user)} onDelete={() => handleAction(user)} />
              )}
            ></Table>
          )}
        </Await>
      </Suspense>
    </Stack>
  );
};

export default AdminUsersPage;
