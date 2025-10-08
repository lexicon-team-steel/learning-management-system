import { ReactElement } from 'react';
import { Chip, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import theme from '../styles/theme';
import AdminPageForm from './AdminPageForm';
import { IParticipant, UserRole } from '../utilities/types';
import { userChipColor, userFullName } from '../utilities/helpers';

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
            <Select
              labelId="role-label"
              id="role-select"
              label="Deltagare"
              name="participantId"
              defaultValue={users[0]?.id}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <Stack gap={theme.layout.gap} direction={'row'} alignItems={'center'}>
                    <Chip label={user.roles[0][0]} color={userChipColor(user)} variant="outlined" size="small" />
                    {userFullName(user)}
                  </Stack>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </AdminPageForm>
  );
};

export default ParticipantForm;
