import { useLoaderData } from 'react-router';
import ModuleTable from '../components/ModuleTable';
import { useCallback } from 'react';
import { IForm, IModule, ITable } from '../utilities/types';
import AdminCrudPage from '../components/AdminCrudPage';
import { EMPTY_MODULE } from '../utilities/constants';
import ModuleForm from '../components/ModuleForm';
import BackLink from '../components/BackLink';
import { Stack } from '@mui/material';
import theme from '../styles/theme';

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
    <Stack spacing={theme.layout.gapLarge}>
      <BackLink name="Hantera kurser" />
      <AdminCrudPage<IModule>
        items={modules}
        emptyItem={EMPTY_MODULE}
        title={courseName}
        subTitle="Hantera moduler"
        buttonLabel="Skapa ny modul"
        FormComponent={FormComponent}
        TableComponent={TableComponent}
      />
    </Stack>
  );
};
export default AdminModulesPage;
