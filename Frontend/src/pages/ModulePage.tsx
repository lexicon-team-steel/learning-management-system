import { ReactElement, Suspense } from 'react';
import { Await } from 'react-router';
import { Stack, Typography } from '@mui/material';
import Card from '../components/Card';

const ModulePage = (): ReactElement => {
  return (
    <Stack>
      <Suspense>
        {/* <Await> */}

        <Card title="Title" titleVariant="h1">
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat veritatis voluptates rem consequuntur esse
            corporis reprehenderit. Illum quos adipisci animi nisi neque quod debitis eius quasi quibusdam at, dolorum
            nemo.
          </Typography>
        </Card>

        {/* </Await> */}
      </Suspense>
    </Stack>
  );
};

export default ModulePage;
