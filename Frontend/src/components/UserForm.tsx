import { ReactElement } from 'react';
import { IParticipant } from '../utilities/types';
import { Button, Stack } from '@mui/material';
import theme from '../styles/theme';

interface IUserFormProps {
  user: IParticipant;
  onSubmit: (user: IParticipant) => void;
  onCancel: () => void;
}

const UserForm = ({ user, onSubmit, onCancel }: IUserFormProps): ReactElement => {
  return (
    <form>
      <p>Future form for ${JSON.stringify(user)}</p>
      <Stack direction="row" spacing={theme.layout.gap}>
        <Button variant="contained" type="submit">
          Spara
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Avbryt
        </Button>
      </Stack>
    </form>
  );
};

export default UserForm;
