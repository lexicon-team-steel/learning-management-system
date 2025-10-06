import { Form, useLoaderData } from 'react-router';
import ModuleTable from '../components/ModuleTable';
import { useCallback } from 'react';
import { IForm, IModule, ITable } from '../utilities/types';
import AdminCrudPage from '../components/AdminCrudPage';
import { EMPTY_MODULE } from '../utilities/constants';

const AdminModulesPage = () => {
  const { courseWithModules } = useLoaderData();
  const modules = courseWithModules.modules;
  const courseName = courseWithModules.name;

  const FormComponent = useCallback(({ item }: IForm<IModule>) => <Form>{item.name}</Form>, []);

  const TableComponent = useCallback(
    ({ items, onEdit, onDelete }: ITable<IModule>) => (
      <ModuleTable modules={items} onEdit={onEdit} onDelete={onDelete} />
    ),
    []
  );

  return (
    <AdminCrudPage<IModule>
      items={modules}
      emptyItem={EMPTY_MODULE}
      title={courseName}
      subTitle="Hantera moduler"
      buttonLabel="Skapa ny modul"
      FormComponent={FormComponent}
      TableComponent={TableComponent}
    />
  );
};
export default AdminModulesPage;
