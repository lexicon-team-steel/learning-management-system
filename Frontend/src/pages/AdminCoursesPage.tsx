import { ReactElement, useCallback } from 'react';
import { useLoaderData } from 'react-router';
import { ICourse, IForm, ITable } from '../utilities/types';
import CourseTable from '../components/CourseTable';
import AdminCrudPage from '../components/AdminCrudPage';
import { EMPTY_COURSE } from '../utilities/constants';
import CourseForm from '../components/CourseForm';

const AdminCoursesPage = (): ReactElement => {
  const { courses } = useLoaderData();

  const FormComponent = useCallback(
    ({ item, onCancel, errors }: IForm<ICourse>) => <CourseForm course={item} onCancel={onCancel} errors={errors} />,
    []
  );

  const TableComponent = useCallback(
    ({ items, onEdit, onDelete }: ITable<ICourse>) => (
      <CourseTable courses={items} onEdit={onEdit} onDelete={onDelete} />
    ),
    []
  );

  return (
    <AdminCrudPage
      items={courses}
      emptyItem={EMPTY_COURSE}
      title="Hantera kurser"
      buttonLabel="Skapa ny kurs"
      FormComponent={FormComponent}
      TableComponent={TableComponent}
    />
  );
};

export default AdminCoursesPage;
