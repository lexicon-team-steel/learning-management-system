import Main from '../components/Main';

import Table from '../components/Table';
import { IParticipant } from '../utilities/types';
import UserTableRow from '../components/UserTableRow';
import { mockUsers } from '../utilities/data/mockData';
import MuduleActivities from '../components/ModuleActivities';
import LinkCard from '../components/LinkCard';
import { Grid } from '@mui/material';

const Sandbox = () => {
  const handleAction = (user: IParticipant) => console.log(user);
  return (
    <Main>
      <Grid container spacing={2} columns={2}>
        {/* <MuduleActivities />
        <LinkCard
          title="Snabblänk"
          buttons={[
            { text: 'Hantera användare', link: '/admin/users' },
            { text: 'Hantera kurser', link: '/admin/courses' },
          ]}
        /> */}
        {/* <Table
          headers={['Namn', 'E-post', 'Roll', 'Åtgärder']}
          keyField="id"
          rows={mockUsers}
          renderItem={(user: IParticipant) => (
            <UserTableRow user={user} onEdit={() => handleAction(user)} onDelete={() => handleAction(user)} />
          )}
        ></Table> */}
      </Grid>
    </Main>
  );
};

export default Sandbox;
