import { Box } from '@mui/material';
import Main from '../components/Main';
import BasicCard from '../components/BasicCard';
import CollapsibleList from '../components/CollapsibleList';

import { Await, useLoaderData } from 'react-router';
import { IParticipantLoader, IStudent } from '../utilities/types';
import { Suspense } from 'react';
import ParticipantItem from '../components/ParticipantItem';

const Sandbox = () => {
  const { participants } = useLoaderData<IParticipantLoader>();

  return (
    <Main>
      <Box sx={{ maxWidth: '360px' }}>
        <Suspense fallback="Waiting for data...">
          <Await resolve={participants}>
            {(students: IStudent[]) => (
              <BasicCard title="Kursdeltagare">
                <CollapsibleList
                  items={students}
                  keyField="email"
                  renderItem={(item: IStudent) => <ParticipantItem participant={item} />}
                />
              </BasicCard>
            )}
          </Await>
        </Suspense>
      </Box>
    </Main>
  );
};

export default Sandbox;
