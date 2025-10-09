import { useCallback } from 'react';
import AdminCrudPage from '../components/AdminCrudPage';
import { EMPTY_PARTICIPANT } from '../utilities/constants';
import { IAdminParticipantsLoader, IForm, IParticipant, ITable } from '../utilities/types';
import ParticipantsTable from '../components/ParticipantTable';
import { useLoaderData } from 'react-router';
import ParticipantForm from '../components/ParticipantForm';
import { Stack } from '@mui/material';
import theme from '../styles/theme';
import BackLink from '../components/BackLink';

const AdminParticipantsPage = () => {
  const { courseWithParticipants, pagedResult } = useLoaderData<IAdminParticipantsLoader>();
  const courseName = courseWithParticipants.name;
  const participants = courseWithParticipants.participants || [];

  const FormComponent = useCallback(
    ({ onCancel }: IForm<IParticipant>) => <ParticipantForm users={pagedResult.items} onCancel={onCancel} />,
    [pagedResult]
  );

  const TableComponent = useCallback(
    ({ items, onDelete }: ITable<IParticipant>) => <ParticipantsTable participants={items} onDelete={onDelete} />,
    []
  );

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <BackLink name="Hantera kurser" />
      <AdminCrudPage<IParticipant>
        items={participants}
        emptyItem={EMPTY_PARTICIPANT}
        title={courseName}
        subTitle="Hantera deltagare"
        buttonLabel="Lägg till"
        FormComponent={FormComponent}
        TableComponent={TableComponent}
      />
    </Stack>
  );
};
export default AdminParticipantsPage;
