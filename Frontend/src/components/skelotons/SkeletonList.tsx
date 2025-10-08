import { Skeleton, Stack } from '@mui/material';
import { ReactElement } from 'react';

interface ISkeletonList {
  height?: number;
}

const SkeletonList = ({ height = 150 }: ISkeletonList): ReactElement => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" height={height} />
      <Skeleton variant="rounded" height={height} />
      <Skeleton variant="rounded" height={height} />
    </Stack>
  );
};

export default SkeletonList;
