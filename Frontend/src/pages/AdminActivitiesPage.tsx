import { ReactElement, useCallback } from 'react';
import { IActivity, IAdminActivitiesLoader, IForm, ITable } from '../utilities/types';
import { Form, useLoaderData } from 'react-router';
import AdminCrudPage from '../components/AdminCrudPage';

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

  const TableComponent = useCallback(() => <div />, []);

  return (
    <AdminCrudPage
      items={module.activities}
      emptyItem={emptyActivity}
      title={`Module: ${module.name}`}
      buttonLabel="Skapa ny activity"
      FormComponent={FormComponent}
      TableComponent={TableComponent}
    />
  );
};

export default AdminActivitiesPage;
