import { useState } from 'react';
import { Button, FormControlLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { useAlert } from '../utilities/context/alert/AlertContext';

const Sandbox = () => {
  const { showAlert } = useAlert();
  const [result, setResult] = useState<'success' | 'fail'>('success');

  const fakeFetch = () => {
    // Simulerar ett API-anrop
    setTimeout(() => {
      if (result === 'success') {
        showAlert({
          entity: 'activity',
          action: 'create',
          status: 'success',
        });
      } else {
        showAlert({
          entity: 'activity',
          action: 'create',
          status: 'error',
          errDetails: 'Servern svarade inte',
        });
      }
    }, 1000);
  };

  return (
    <Stack spacing={2} alignItems="flex-start">
      <RadioGroup row value={result} onChange={(e) => setResult(e.target.value as 'success' | 'fail')}>
        <FormControlLabel value="success" control={<Radio />} label="Success" />
        <FormControlLabel value="fail" control={<Radio />} label="Fail" />
      </RadioGroup>

      <Button variant="contained" onClick={fakeFetch}>
        Kör fejkfetch
      </Button>
    </Stack>
  );
};

export default Sandbox;
