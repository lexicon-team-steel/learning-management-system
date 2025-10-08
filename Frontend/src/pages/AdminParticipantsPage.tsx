import { useCallback } from 'react';
import AdminCrudPage from '../components/AdminCrudPage';
import { EMPTY_PARTICIPANT } from '../utilities/constants';
import { IParticipant, ITable } from '../utilities/types';
import ParticipantsTable from '../components/ParticipantTable';

const AdminParticipantsPage = () => {
  const FormComponent = useCallback(() => <div></div>, []);

  const TableComponent = useCallback(
    ({ items, onDelete }: ITable<IParticipant>) => <ParticipantsTable participants={items} onDelete={onDelete} />,
    []
  );

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
