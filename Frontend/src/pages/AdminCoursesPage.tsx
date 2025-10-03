import { ReactElement, Suspense } from 'react';
import { Stack } from '@mui/material';
import theme from '../styles/theme';
import { Await, useLoaderData } from 'react-router';
import AdminPageTitle from '../components/AdminPageTitle';
import { useCrud } from '../utilities/hooks/useCrud';
import { ICourse } from '../utilities/types';
import CourseTable from '../components/CourseTable';

const AdminCoursesPage = (): ReactElement => {
  const { courses } = useLoaderData();
  const { items, isEditing, handleChange, handleDelete } = useCrud<ICourse>(courses);

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <AdminPageTitle
        pageTitle="Hantera kurser"
        buttonLabel="Skapa ny kurs"
        buttonDisabled={isEditing}
        onButtonClick={() => handleChange({ id: '', name: '', description: '', startDate: '', endDate: '' })}
      />
      <Suspense>
        <Await resolve={items}>
          {(items: ICourse[]) => <CourseTable courses={items} onEdit={handleChange} onDelete={handleDelete} />}
        </Await>
      </Suspense>
    </Stack>
  );
};

export default AdminCoursesPage;
