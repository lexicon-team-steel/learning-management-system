import { Box } from '@mui/material';
import Main from '../components/Main';
import BasicCard from '../components/BasicCard';
import { IParticipantLoader } from '../features/course-participants/types';
import ParticipantItem from '../features/course-participants/components/ParticipantItem';
import CollapsibleList from '../components/CollapsibleList';

import { Await, useLoaderData } from 'react-router';
import { IStudent } from '../utilities/types';
import { Suspense } from 'react';

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
