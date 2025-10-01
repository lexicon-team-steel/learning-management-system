import { ReactElement } from 'react';
import { useLoaderData } from 'react-router';
import { IParticipant } from '../utilities/types';
import { Box, Button, Stack, Typography } from '@mui/material';
import theme from '../styles/theme';
import PlusIcon from '@mui/icons-material/Add';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import { useCrud } from '../utilities/hooks/useCrud';

interface IAdminProps {
  pageTitle: string;
  buttonLabel: string;
  buttonDisabled: boolean;
  onButtonClick: () => void;
}

const AdminTitle = ({ pageTitle, buttonLabel, buttonDisabled, onButtonClick }: IAdminProps): ReactElement => (
  <Box display="flex" justifyContent="space-between" alignItems="center" gap={theme.layout.gap}>
    <Typography variant="h1">{pageTitle}</Typography>
    <Button startIcon={<PlusIcon />} variant="contained" disabled={buttonDisabled} onClick={onButtonClick}>
      {buttonLabel}
    </Button>
  </Box>
);

const AdminUsersPage = (): ReactElement => {
  const { users } = useLoaderData();

  const { items, selectedItem, isEditing, handleChange, handleSave, handleDelete, handleCancel } =
    useCrud<IParticipant>(users);

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <AdminTitle
        pageTitle="Hantera användare"
        buttonLabel="Skapa ny användare"
        buttonDisabled={isEditing}
        onButtonClick={() => handleChange({ id: '', lastName: '', firstName: '', email: '', roles: [] })}
      />
      {selectedItem && <UserForm user={selectedItem} onSubmit={handleSave} onCancel={handleCancel} />}
      <UserTable users={items} onEdit={handleChange} onDelete={handleDelete} />;
    </Stack>
  );
};

export default AdminUsersPage;
