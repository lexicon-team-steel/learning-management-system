import { ReactElement, useCallback } from 'react';
import { useLoaderData } from 'react-router';
import { IForm, IPagedLoader, IParticipant, ITable } from '../utilities/types';

import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import AdminCrudPage from '../components/AdminCrudPage';
import { EMPTY_PARTICIPANT } from '../utilities/constants';

const AdminUsersPage = (): ReactElement => {
  const { items, details } = useLoaderData<IPagedLoader<IParticipant>>();

  const FormComponent = useCallback(
    ({ item, onCancel, errors }: IForm<IParticipant>) => <UserForm user={item} onCancel={onCancel} errors={errors} />,
    []
  );

  const TableComponent = useCallback(
    ({ items, onEdit, onDelete }: ITable<IParticipant>) => (
      <UserTable users={items} onEdit={onEdit} onDelete={onDelete} />
    ),
    []
  );

  return (
    <AdminCrudPage
      items={items}
      emptyItem={EMPTY_PARTICIPANT}
      title="Hantera användare"
      buttonLabel="Skapa ny användare"
      FormComponent={FormComponent}
      TableComponent={TableComponent}
    />
  );
};

export default AdminUsersPage;
