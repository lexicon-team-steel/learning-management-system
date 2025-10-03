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
  const { isEditing, handleChange, handleDelete } = useCrud<ICourse>();

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <AdminPageTitle
        pageTitle="Hantera kurser"
        buttonLabel="Skapa ny kurs"
        buttonDisabled={isEditing}
        onButtonClick={() => handleChange({ id: '', name: '', description: '', startDate: '', endDate: '' })}
      />
      <Suspense>
        <Await resolve={courses}>
          {(courses: ICourse[]) => <CourseTable courses={courses} onEdit={handleChange} onDelete={handleDelete} />}
        </Await>
      </Suspense>
    </Stack>
  );
};

export default AdminCoursesPage;
