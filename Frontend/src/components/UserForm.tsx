import { ReactElement } from 'react';
import { IParticipant } from '../utilities/types';
import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material';
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
      <Grid container spacing={theme.layout.gap}>
        <Grid size={12}>
          <RadioGroup row defaultValue={user.roles[0]}>
            {['Student', 'Teacher'].map((role) => (
              <FormControlLabel key={role} control={<Radio name="roles" value={role} />} label={role} />
            ))}
          </RadioGroup>
        </Grid>
        <Grid size={6}>
          <TextField
            label="Förnamn"
            name="firstName"
            variant="outlined"
            defaultValue={user.firstName}
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            label="Efternamn"
            name="lastName"
            variant="outlined"
            defaultValue={user.lastName}
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            type="email"
            label="E-post"
            name="email"
            variant="outlined"
            defaultValue={user.email}
            fullWidth
            required
          />
        </Grid>
        <Grid size={6}>
          <TextField
            type="password"
            label="Lösenord"
            name="password"
            variant="outlined"
            defaultValue=""
            fullWidth
            required={action === 'create'}
          />
        </Grid>
        {/* <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel id="roll-select-label">Roll</InputLabel>
            <Select labelId="roll-select-label" label="Roll" name="roles" defaultValue={user.roles[0]} required>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
            </Select>
          </FormControl>
        </Grid> */}
      </Grid>
    </AdminPageForm>
  );
};

export default UserForm;
