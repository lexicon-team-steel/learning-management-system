import { useLoaderData } from 'react-router';
import ModuleTable from '../components/ModuleTable';
import { useCallback } from 'react';
import { IForm, IModule, ITable } from '../utilities/types';
import AdminCrudPage from '../components/AdminCrudPage';
import { EMPTY_MODULE } from '../utilities/constants';
import ModuleForm from '../components/ModuleForm';

const AdminModulesPage = () => {
  const { courseWithModules } = useLoaderData();
  const modules = courseWithModules.modules;
  const courseName = courseWithModules.name;

  const FormComponent = useCallback(
    ({ item, onCancel, errors }: IForm<IModule>) => <ModuleForm module={item} onCancel={onCancel} errors={errors} />,
    []
  );

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
