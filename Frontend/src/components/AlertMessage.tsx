import { Alert, Snackbar, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { Action, Entity, Status } from '../utilities/types';

interface IAlertMessageProps {
  entity: Entity;
  action: Action;
  status: Status;
  errDetails?: string;
  open: boolean;
  onClose: () => void;
}

const entityMap: Record<Entity, string> = {
  activity: 'Aktiviteten',
  user: 'Användaren',
  course: 'Kursen',
  module: 'Modulen',
};

const styledCenterIcon = {
  display: 'flex',
  alignItems: 'center',
  '& .MuiAlert-action': { padding: '0 0 0 16px' },
};

const getAlertMessage = (entity: Entity, action: Action, status: Status, errDetails?: string): string => {
  const entitySvenska = entityMap[entity] || entity;

  if (status === 'success') {
    if (action === 'create') return `${entitySvenska} har skapats!`;
    if (action === 'update') return `${entitySvenska} har uppdaterats!`;
  }

  if (action === 'create') return `${entitySvenska} kunde inte skapas${errDetails ? `: ${errDetails}` : ''}`;
  if (action === 'update') return `${entitySvenska} kunde inte uppdateras${errDetails ? `: ${errDetails}` : ''}`;

  return 'Något gick fel';
};

const AlertMessage = ({ entity, action, status, errDetails, open, onClose }: IAlertMessageProps): ReactElement => {
  const message = getAlertMessage(entity, action, status, errDetails);

  return (
    <Snackbar open={open} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert severity={status} onClose={onClose} sx={styledCenterIcon}>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};
export default AlertMessage;
