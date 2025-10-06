import { Button } from '@mui/material';
import Main from '../components/Main';
import ConfirmDialog from '../components/ConfirmDialog';
import { useState } from 'react';

const Sandbox = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <Main>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <ConfirmDialog
        open={open}
        entity="activity"
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={() => {
          setOpen(false);
        }}
      />
    </Main>
  );
};

export default Sandbox;
