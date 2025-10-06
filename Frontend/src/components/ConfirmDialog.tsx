import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ReactElement } from 'react';
import { Entity } from '../utilities/types';
import { entityMap } from '../utilities/helpers';

interface IConfirmDialog {
  open: boolean;
  entity: Entity;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({ open, entity, onClose, onConfirm }: IConfirmDialog): ReactElement => {
  const entitySvenska = entityMap[entity] || entity;
  // handle Delete TODO
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Är du säker på att du vill ta bort {entitySvenska}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Detta kommer att ta bort {entitySvenska}.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Nej</Button>
          <Button onClick={onConfirm}>Ja</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
