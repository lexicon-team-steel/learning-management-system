import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { ReactElement } from 'react';
import { Entity } from '../utilities/types';
import { capitalize, translateEntity } from '../utilities/helpers';
import theme from '../styles/theme';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface IConfirmDialog {
  open: boolean;
  entity: Entity;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDialog = ({ open, entity, onClose, onConfirm }: IConfirmDialog): ReactElement => {
  const entitySv = capitalize(translateEntity[entity]) || entity;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ '& .MuiPaper-root': { width: '350px' } }}
      >
        <HighlightOffIcon
          sx={{
            fontSize: '4rem',
            color: theme.palette.error.main,
            alignSelf: 'center',
            pt: 2,
          }}
        />
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
          Ta bort {entitySv}?
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center' }}>
          <DialogContentText id="alert-dialog-description">
            <Typography fontSize={'0.9rem'}>Bekräfta för att ta bort {entitySv}.</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: theme.palette.grey[500],
              '&:hover': { backgroundColor: theme.palette.grey[600] },
            }}
            onClick={onClose}
          >
            Avbryt
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Bekräfta
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
