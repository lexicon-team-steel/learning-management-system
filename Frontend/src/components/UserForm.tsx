import { ReactElement } from 'react';
import { FormErrorType, IParticipant } from '../utilities/types';
import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import theme from '../styles/theme';

import AdminPageForm from './AdminPageForm';

interface IStyledTextfield {
  type?: string;
  label: string;
  name: string;
  value: string;
  error?: string;
  required?: boolean;
}

const StyledTextField = ({ type = 'text', label, name, value, required = true, error }: IStyledTextfield) => (
  <TextField
    type={type}
    label={label}
    name={name}
    variant="outlined"
    defaultValue={value}
    fullWidth
    required={required}
    error={!!error}
    helperText={error}
  />
);

interface IUserFormProps {
  onCancel: () => void;
  user: IParticipant;
  errors: FormErrorType;
}

const UserForm = ({ onCancel, user, errors }: IUserFormProps): ReactElement => {
  const action = user.id ? 'update' : 'create';
  const title = action === 'create' ? 'Ny användare' : 'Redigera användare';
  const submitLabel = action === 'create' ? 'Skapa' : 'Spara';

  return (
    <AdminPageForm title={title} submitLabel={submitLabel} onCancel={onCancel}>
      <input type="hidden" name="_action" value={action} />
      <input type="hidden" name="id" value={user.id} />
      <Grid container spacing={theme.layout.gap}>
        <Grid size={12}>
          <RadioGroup row name="role" defaultValue={user.roles[0]}>
            <FormControlLabel value="Student" control={<Radio />} label="Student" />
            <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
          </RadioGroup>
        </Grid>
        <Grid size={6}>
          <StyledTextField label="Förnamn" name="firstName" value={user.firstName} error={errors?.firstName} />
        </Grid>
        <Grid size={6}>
          <StyledTextField label="Efternamn" name="lastName" value={user.lastName} error={errors?.lastName} />
        </Grid>
        <Grid size={6}>
          <StyledTextField type="email" label="E-post" name="email" value={user.email} error={errors?.email} />
        </Grid>
        <Grid size={6}>
          <StyledTextField
            type="password"
            label="Lösenord"
            name="password"
            value=""
            required={action === 'create'}
            error={errors?.password}
          />
        </Grid>
      </Grid>
    </AdminPageForm>
  );
};

export default UserForm;
