import { Box } from '@mui/material';
import Main from '../components/Main';
import CollapsibleList from '../components/CollapsibleList';

import { Await, useLoaderData } from 'react-router';
import { IParticipantLoader, IStudent } from '../utilities/types';
import { Suspense } from 'react';
import ParticipantItem from '../components/ParticipantItem';
import Card from '../components/Card';
import MuduleActivities from '../components/ModuleActivities';

const Sandbox = () => {
  const { participants } = useLoaderData<IParticipantLoader>();

  return (
    <Main>
      <Box sx={{ maxWidth: '360px' }}>
        <Suspense fallback="Waiting for data...">
          <Await resolve={participants}>
            {(students: IStudent[]) => (
              <Card title="Kursdeltagare">
                <CollapsibleList
                  items={students}
                  keyField="email"
                  renderItem={(item: IStudent) => <ParticipantItem participant={item} />}
                />
              </Card>
            )}
          </Await>
        </Suspense>
      </Box>
      <MuduleActivities /> {/*  // temp for testing */}
    </Main>
  );
};

export default Sandbox;
