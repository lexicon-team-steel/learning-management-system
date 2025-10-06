import { Stack } from '@mui/material';
import theme from '../styles/theme';
import AdminPageTitle from '../components/AdminPageTitle';
import { Await, useLoaderData } from 'react-router';
import ModuleTable from '../components/ModuleTable';
import { Suspense } from 'react';
import { IModule } from '../utilities/types';
import { useCrud } from '../utilities/hooks/useCrud';

const AdminModulesPage = () => {
  const { modules } = useLoaderData();
  const { isEditing, handleChange, handleDelete } = useCrud<IModule>();

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <AdminPageTitle
        pageTitle="Kursnamn"
        subTitle="Hantera moduler"
        buttonLabel="Skapa ny modul"
        buttonDisabled={isEditing}
        onButtonClick={() =>
          handleChange({
            id: '',
            name: '',
            description: '',
            startDate: '',
            endDate: '',
            activities: [],
            courseName: '',
          })
        }
      />
      <Suspense>
        <Await resolve={modules}>
          {(modules: IModule[]) => <ModuleTable modules={modules} onEdit={handleChange} onDelete={handleDelete} />}
        </Await>
      </Suspense>
    </Stack>
  );
};
export default AdminModulesPage;
