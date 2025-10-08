import { useCallback } from 'react';
import AdminCrudPage from '../components/AdminCrudPage';
import { EMPTY_PARTICIPANT } from '../utilities/constants';
import { IParticipant } from '../utilities/types';

const AdminParticipantsPage = () => {
  const FormComponent = useCallback(() => <div></div>, []);

  const TableComponent = useCallback(() => <div></div>, []);

  return (
    <AdminCrudPage<IParticipant>
      items={[]}
      emptyItem={EMPTY_PARTICIPANT}
      title="Hantera deltagare"
      buttonLabel="Lägg till"
      FormComponent={FormComponent}
      TableComponent={TableComponent}
    />
  );
};
export default AdminParticipantsPage;
