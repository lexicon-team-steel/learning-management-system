import { Button, Stack } from '@mui/material';
import AlertMessage from '../components/AlertMessage';
import Main from '../components/Main';
import { useState } from 'react';
import { Action, Entity, Status } from '../utilities/types';

const Sandbox = () => {
  // Demo example
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>();
  const [entity, setEnity] = useState<Entity>();
  const [action, setAction] = useState<Action>();

  const create = () => {
    setEnity('activity');
    setAction('create');
    setStatus('success');
    setOpen(true);
  };

  const createErr = () => {
    setEnity('activity');
    setAction('create');
    setStatus('error');
    setOpen(true);
  };
  const update = () => {
    setEnity('module');
    setAction('update');
    setStatus('success');
    setOpen(true);
  };

  const updateErr = () => {
    setEnity('module');
    setAction('update');
    setStatus('error');
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  return (
    <Main>
      <Stack spacing={2}>
        <Button variant="contained" onClick={create}>
          Create success
        </Button>

        <Button variant="contained" onClick={createErr}>
          Create error
        </Button>
        <Button variant="contained" onClick={update}>
          Update OK
        </Button>

        <Button variant="contained" onClick={updateErr}>
          Update error
        </Button>
      </Stack>

      {open && entity && action && status && (
        <AlertMessage open={open} onClose={handleClose} entity={entity} action={action} status={status} />
      )}
    </Main>
  );
};

export default Sandbox;
