import { ReactElement, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';
import { IParticipant } from '../utilities/types';
import Table from '../components/Table';
import UserTableRow from '../components/UserTableRow';

const AdminUsersPage = (): ReactElement => {
  const { users } = useLoaderData();
  const handleAction = (user: IParticipant) => console.log(user);

  return (
    <>
      <Suspense>
        <Await resolve={users}>
          {(users: IParticipant[]) => (
            <Table
              headers={['Namn', 'E-post', 'Roll', 'Åtgärder']}
              keyField="id"
              rows={users}
              renderItem={(user: IParticipant) => (
                <UserTableRow user={user} onEdit={() => handleAction(user)} onDelete={() => handleAction(user)} />
              )}
            ></Table>
          )}
        </Await>
      </Suspense>
    </>
  );
};

export default AdminUsersPage;
