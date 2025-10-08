import { ReactElement, useCallback } from 'react';
import { IActivity, IAdminActivitiesLoader, IForm, ITable } from '../utilities/types';
import { Form, useLoaderData } from 'react-router';
import AdminCrudPage from '../components/AdminCrudPage';
import ActivityTable from '../components/ActivityTable';
import { Stack } from '@mui/material';
import BackLink from '../components/BackLink';
import theme from '../styles/theme';

const AdminActivitiesPage = (): ReactElement => {
  const { module, activityTypes } = useLoaderData<IAdminActivitiesLoader>();
  const emptyActivity: IActivity = {
    id: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    activityType: activityTypes[0],
  };

  /**
   * Futute Form
   */
  const FormComponent = useCallback(({ item }: IForm<IActivity>) => <Form>{item.name}</Form>, []);

  const TableComponent = useCallback(
    ({ items, onEdit, onDelete }: ITable<IActivity>) => (
      <ActivityTable activities={items} onEdit={onEdit} onDelete={onDelete} />
    ),
    []
  );

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <BackLink name="Hantera moduler" />
      <AdminCrudPage
        items={module.activities}
        emptyItem={emptyActivity}
        title={module.name}
        subTitle="Hantera aktiviteter"
        buttonLabel="Skapa ny aktivitet"
        FormComponent={FormComponent}
        TableComponent={TableComponent}
      />
    </Stack>
  );
};

export default AdminActivitiesPage;
