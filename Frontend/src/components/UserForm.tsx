import { ReactElement } from 'react';
import { FormErrorType, IParticipant } from '../utilities/types';
import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import theme from '../styles/theme';

import AdminPageForm from './AdminPageForm';
import TextInput from './TextInput';
import { translateRole } from '../utilities/helpers';
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
            <FormControlLabel value="Teacher" control={<Radio />} label={translateRole('Teacher')} />
          </RadioGroup>
        </Grid>
        <Grid size={6}>
          <TextInput label="Förnamn" name="firstName" value={user.firstName} error={errors?.firstName} />
        </Grid>
        <Grid size={6}>
          <TextInput label="Efternamn" name="lastName" value={user.lastName} error={errors?.lastName} />
        </Grid>
        <Grid size={6}>
          <TextInput type="email" label="E-post" name="email" value={user.email} error={errors?.email} />
        </Grid>
        <Grid size={6}>
          <TextInput
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
