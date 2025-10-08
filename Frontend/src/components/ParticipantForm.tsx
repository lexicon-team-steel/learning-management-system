import { ReactElement } from 'react';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import theme from '../styles/theme';
import AdminPageForm from './AdminPageForm';
import { IParticipant } from '../utilities/types';

interface IParticipantFormProps {
  onCancel: () => void;
  users: IParticipant[];
}

const ParticipantForm = ({ onCancel, users }: IParticipantFormProps): ReactElement => {
  return (
    <AdminPageForm title="Lägg till en deltagare" submitLabel="Spara" onCancel={onCancel}>
      <input type="hidden" name="_action" value="create" />
      <input type="hidden" name="id" value="" />
      <Grid container spacing={theme.layout.gap}>
        <Grid size={12}>
          <FormControl fullWidth size="small">
            <InputLabel id="participant-label">Användare</InputLabel>
            <Select labelId="role-label" id="role-select" label="Deltagare" name="participantId" defaultValue="">
              <MenuItem value="">- Välj -</MenuItem>
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </AdminPageForm>
  );
};

export default ParticipantForm;
