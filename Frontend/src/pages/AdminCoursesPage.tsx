import { ReactElement, useCallback } from 'react';
import { Form, useLoaderData } from 'react-router';
import { ICourse, IForm, ITable } from '../utilities/types';
import CourseTable from '../components/CourseTable';
import AdminCrudPage from '../components/AdminCrudPage';
import { EMPTY_COURSE } from '../utilities/constants';

const AdminCoursesPage = (): ReactElement => {
  const { courses } = useLoaderData();

  /**
   * Futute Form
   */
  const FormComponent = useCallback(({ item }: IForm<ICourse>) => <Form>{item.name}</Form>, []);

  const TableComponent = useCallback(
    ({ items, onEdit, onDelete }: ITable<ICourse>) => (
      <CourseTable courses={items} onEdit={onEdit} onDelete={onDelete} />
    ),
    []
  );

  useEffect(() => {
    setErrors(actionData?.errors || {});
  }, [actionData, setErrors]);

  useEffect(() => {
    if (selectedItem) scrollTop();
  }, [selectedItem]);
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
