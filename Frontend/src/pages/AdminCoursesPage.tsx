import { ReactElement, Suspense, useEffect } from 'react';
import { Stack } from '@mui/material';
import theme from '../styles/theme';
import { Await, useActionData, useLoaderData } from 'react-router';
import AdminPageTitle from '../components/AdminPageTitle';
import { useCrud } from '../utilities/hooks/useCrud';
import { IBasicAction, ICourse } from '../utilities/types';
import CourseTable from '../components/CourseTable';
import { scrollTop } from '../utilities/helpers';
import CourseForm from '../components/CourseForm';

const AdminCoursesPage = (): ReactElement => {
  const { courses } = useLoaderData();
  const actionData = useActionData<IBasicAction>();
  const { selectedItem, isEditing, handleChange, handleDelete, handleCancel, errors, setErrors } = useCrud<ICourse>();

  useEffect(() => {
    setErrors(actionData?.errors || {});
  }, [actionData, setErrors]);

  useEffect(() => {
    if (selectedItem) scrollTop();
  }, [selectedItem]);
  return (
    <Stack spacing={theme.layout.gapLarge}>
      <AdminPageTitle
        pageTitle="Hantera kurser"
        buttonLabel="Skapa ny kurs"
        buttonDisabled={isEditing}
        onButtonClick={() => handleChange({ id: '', name: '', description: '', startDate: '', endDate: '' })}
      />
      {selectedItem && (
        <CourseForm key={selectedItem.id} course={selectedItem} onCancel={handleCancel} errors={errors} />
      )}
      <Suspense>
        <Await resolve={courses}>
          {(courses: ICourse[]) => <CourseTable courses={courses} onEdit={handleChange} onDelete={handleDelete} />}
        </Await>
      </Suspense>
    </Stack>
  );
};

export default AdminCoursesPage;
