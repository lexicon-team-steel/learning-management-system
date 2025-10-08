import { Alert, Snackbar, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { Action, Entity, Status } from '../utilities/types';
import { capitalize, translateEntity } from '../utilities/helpers';

interface IAlertMessageProps {
  entity: Entity;
  action: Action;
  status: Status;
  errDetails?: string;
  open: boolean;
  onClose: () => void;
}

const styledCenterIcon = {
  display: 'flex',
  alignItems: 'center',
  '& .MuiAlert-action': { padding: '0 0 0 16px' },
};

const getAlertMessage = (entity: Entity, action: Action, status: Status, errDetails?: string): string => {
  const entitySv = capitalize(translateEntity[entity]) || entity;

  if (status === 'success') {
    // I am sorry for this
    if (action === 'create') return entity === 'participant' ? `Deltagaren är tillagd!` : `${entitySv} har skapats!`;
    if (action === 'update') return `${entitySv} har uppdaterats!`;
    if (action === 'delete') return `${entitySv} har tagits bort!`;
  }

  if (action === 'create') return `${entitySv} kunde inte skapas${errDetails ? `: ${errDetails}` : ''}`;
  if (action === 'update') return `${entitySv} kunde inte uppdateras${errDetails ? `: ${errDetails}` : ''}`;
  if (action === 'delete') return `${entitySv} kunde inte tas bort${errDetails ? `: ${errDetails}` : ''}`;

  return 'Något gick fel';
};

const AlertMessage = ({ entity, action, status, errDetails, open, onClose }: IAlertMessageProps): ReactElement => {
  const message = getAlertMessage(entity, action, status, errDetails);

  return (
    <Snackbar
      autoHideDuration={3000}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={status} onClose={onClose} sx={styledCenterIcon}>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};
export default AlertMessage;
