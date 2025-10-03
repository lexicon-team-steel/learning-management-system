import { Alert, AlertColor, Snackbar } from '@mui/material';
import { ReactElement } from 'react';
import { Action, Entity, Status } from '../utilities/types';

interface IGetAlertMessageProps {
  severity: AlertColor;
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
  '& .MuiAlert-icon': { paddingTop: '4px' },
  '& .MuiAlert-action': { padding: '0 0 0 16px' },
};

const getAlertMessage = (entity: Entity, action: Action, status: Status, errDetails?: string): string => {
  const entitySvenska = entityMap[entity] || entity;

  if (status === 'success') {
    if (action === 'create') return `${entitySvenska} har skapats!`;
    if (action === 'update') return `${entitySvenska} har uppdaterats!`;
  }

  // status === 'error'
  if (action === 'create') return `${entitySvenska} kunde inte skapas${errDetails ? `: ${errDetails}` : ''}`;
  if (action === 'update') return `${entitySvenska} kunde inte uppdateras${errDetails ? `: ${errDetails}` : ''}`;

  return 'Något gick fel';
};

const GetAlertMessage = ({
  severity,
  entity,
  action,
  status,
  errDetails,
  open,
  onClose,
}: IGetAlertMessageProps): ReactElement => {
  const message = getAlertMessage(entity, action, status, errDetails);

  const derivedSeverity: AlertColor = severity ?? (status === 'error' ? 'error' : 'success');

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert severity={derivedSeverity} onClose={onClose} sx={styledCenterIcon}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default GetAlertMessage;
