import Main from '../components/Main';
import Table from '../components/Table';
import { IParticipant } from '../utilities/types';
import UserTableRow from '../components/UserTableRow';
import { mockUsers } from '../utilities/data/mockData';

const Sandbox = () => {
  const handleAction = (user: IParticipant) => console.log(user);
  return (
    <Main>
      <Table
        headers={['Namn', 'E-post', 'Roll', 'Åtgärder']}
        keyField="id"
        rows={mockUsers}
        renderItem={(user: IParticipant) => (
          <UserTableRow user={user} onEdit={() => handleAction(user)} onDelete={() => handleAction(user)} />
        )}
      ></Table>
    </Main>
  );
};

export default Sandbox;
