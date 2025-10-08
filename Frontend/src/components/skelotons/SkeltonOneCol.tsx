import { Skeleton, Stack } from '@mui/material';
import { ReactElement } from 'react';

interface ISkeletonOneCol {
  width?: number | string;
  height?: number;
}

const SkeletonOneCol = ({ width = '100%', height = 120 }: ISkeletonOneCol): ReactElement => {
  return (
    <Stack direction="row" spacing={1}>
      <Skeleton variant="rounded" width={width} height={height} />
    </Stack>
  );
};

export default SkeletonOneCol;
