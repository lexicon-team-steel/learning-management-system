import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ReactElement } from 'react';

const LoadingSpinner = (): ReactElement => {
  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};
export default LoadingSpinner;
