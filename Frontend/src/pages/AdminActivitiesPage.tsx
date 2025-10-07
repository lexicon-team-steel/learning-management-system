import { ReactElement, useCallback } from 'react';
import { IActivity, IAdminActivitiesLoader, IForm, ITable } from '../utilities/types';
import { useLoaderData } from 'react-router';
import AdminCrudPage from '../components/AdminCrudPage';
import ActivityTable from '../components/ActivityTable';
import ActivityForm from '../components/ActivityForm';

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
  const FormComponent = useCallback(
    ({ item, onCancel, errors }: IForm<IActivity>) => (
      <ActivityForm activity={item} onCancel={onCancel} errors={errors} />
    ),
    []
  );

  const TableComponent = useCallback(
    ({ items, onEdit, onDelete }: ITable<IActivity>) => (
      <ActivityTable activities={items} onEdit={onEdit} onDelete={onDelete} />
    ),
    []
  );

  return (
    <AdminCrudPage
      items={module.activities}
      emptyItem={emptyActivity}
      title={module.name}
      subTitle="Hantera aktiviteter"
      buttonLabel="Skapa ny activity"
      FormComponent={FormComponent}
      TableComponent={TableComponent}
    />
  );
};

export default AdminActivitiesPage;
