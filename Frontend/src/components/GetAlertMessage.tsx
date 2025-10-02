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

const getAlertMessage = (entity: Entity, action: Action, status: Status, errDetails?: string): string => {
  if (status === 'success') {
    const actionWord = action === 'create' ? 'skapat' : 'uppdaterat';
    const article = action === 'create' ? 'en ny' : '';
    return `Du har ${actionWord} ${article} ${entity}`;
  }

  // Status === 'error'
  const errActionWord = action === 'create' ? 'skapa' : 'updatera';
  const base = `Det gick inte att ${errActionWord} ${entity}`;
  return errDetails ? `${base}: ${errDetails}` : base;
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
      <Alert severity={derivedSeverity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default GetAlertMessage;
