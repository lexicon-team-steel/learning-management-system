import { Box } from '@mui/material';
import Main from '../components/Main';
import BasicCard from '../components/BasicCard';
import { Participant } from '../features/course-participants/types';
import ParticipantItem from '../features/course-participants/components/ParticipantItem';
import CollapsibleList from '../components/CollapsibleList';
import { participants } from '../utilities/data';

const Sandbox = () => {
  return (
    <Main>
      <Box sx={{ maxWidth: '360px' }}>
        <BasicCard title="Kursdeltagare">
          <CollapsibleList
            items={participants}
            keyField="email"
            renderItem={(item: Participant) => <ParticipantItem participant={item} />}
          />
        </BasicCard>
      </Box>
    </Main>
  );
};

export default Sandbox;
