import { Skeleton, Stack } from '@mui/material';
import { ReactElement } from 'react';

interface ISkeletonTwoCols {
  width?: number;
  height?: number;
}

const SkeletonTwoCols = ({ width = 300, height = 120 }: ISkeletonTwoCols): ReactElement => {
  return (
    <Stack direction="row" spacing={1}>
      <Skeleton variant="rounded" width={width} height={height} />
      <Skeleton variant="rounded" width={width} height={height} />
    </Stack>
  );
};

export default SkeletonTwoCols;
