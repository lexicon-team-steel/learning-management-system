import { Box } from '@mui/material';
import Main from '../components/Main';
import RegularCard from '../components/RegularCard';
import { Participant } from '../features/course-participants/types';
import ParticipantItem from '../features/course-participants/components/ParticipantItem';
import CollapsibleList from '../components/CollapsibleList';
import { participants } from '../utilities/data';

const Sandbox = () => {
  return (
    <Main>
      <Box sx={{ maxWidth: '360px' }}>
        <RegularCard title="Kursdeltagare">
          <CollapsibleList
            items={participants}
            keyField="email"
            renderItem={(item: Participant) => <ParticipantItem participant={item} />}
          />
        </RegularCard>
      </Box>
    </Main>
  );
};

export default Sandbox;
