import { useCallback } from 'react';
import AdminCrudPage from '../components/AdminCrudPage';
import { EMPTY_PARTICIPANT } from '../utilities/constants';
import { IAdminParticipantsLoader, IParticipant, ITable } from '../utilities/types';
import ParticipantsTable from '../components/ParticipantTable';
import { useLoaderData } from 'react-router';

const AdminParticipantsPage = () => {
  const { courseWithParticipants } = useLoaderData<IAdminParticipantsLoader>();
  const courseName = courseWithParticipants.name;
  const participants = courseWithParticipants.participants || [];

  const FormComponent = useCallback(() => <div></div>, []);

  const TableComponent = useCallback(
    ({ items, onDelete }: ITable<IParticipant>) => <ParticipantsTable participants={items} onDelete={onDelete} />,
    []
  );

  return (
    <AdminCrudPage<IParticipant>
      items={participants}
      emptyItem={EMPTY_PARTICIPANT}
      title={courseName}
      subTitle="Hantera deltagare"
      buttonLabel="Lägg till"
      FormComponent={FormComponent}
      TableComponent={TableComponent}
    />
  );
};
export default AdminParticipantsPage;
