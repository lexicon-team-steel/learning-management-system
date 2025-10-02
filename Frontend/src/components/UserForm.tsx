import { ReactElement } from 'react';
import { IParticipant } from '../utilities/types';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import theme from '../styles/theme';

import AdminPageForm from './AminPageForm';

interface IUserFormProps {
  onCancel: () => void;
  user: IParticipant;
}

const UserForm = ({ onCancel, user }: IUserFormProps): ReactElement => {
  const action = user.id ? 'edit' : 'create';
  const title = action === 'create' ? 'Ny användare' : 'Redigera användare';
  const submitLabel = action === 'create' ? 'Skapa' : 'Spara';

  return (
    <AdminPageForm title={title} submitLabel={submitLabel} onCancel={onCancel}>
      <input type="hidden" name="_action" value={action} />
      <input type="hidden" name="id" value={user.id} />
      <Stack direction="row" gap={theme.layout.gap}>
        <TextField
          label="Förnamn"
          name="firstName"
          variant="outlined"
          defaultValue={user.firstName}
          fullWidth
          required
        />
        <TextField
          label="Efternamn"
          name="lastName"
          variant="outlined"
          defaultValue={user.lastName}
          fullWidth
          required
        />
      </Stack>
      <Stack direction="row" gap={theme.layout.gap}>
        <TextField
          type="email"
          label="E-post"
          name="email"
          variant="outlined"
          defaultValue={user.email}
          fullWidth
          required
        />
        <TextField
          type="password"
          label="Lösenord"
          name="password"
          variant="outlined"
          defaultValue=""
          fullWidth
          required={action === 'create'}
        />
      </Stack>
      <FormControl>
        <InputLabel id="roll-select-label">Roll</InputLabel>
        <Select labelId="roll-select-label" label="Roll" name="roles" defaultValue={user.roles[0]} required>
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Teacher">Teacher</MenuItem>
        </Select>
      </FormControl>
    </AdminPageForm>
  );
};

export default UserForm;
