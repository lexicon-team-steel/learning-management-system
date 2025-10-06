import { ComponentType, ReactElement, useEffect } from 'react';
import { useActionData } from 'react-router';
import { IBasicAction, IForm, ITable } from '../utilities/types';
import { Stack } from '@mui/material';
import theme from '../styles/theme';
import { useCrud } from '../utilities/hooks/useCrud';
import AdminPageTitle from '../components/AdminPageTitle';
import { scrollTop } from '../utilities/helpers';
import { useAlert } from '../utilities/context/alert/AlertContext';

interface IAdminCrudPageProps<T> {
  items: T[];
  emptyItem: T;
  title: string;
  buttonLabel: string;
  FormComponent: ComponentType<IForm<T>>;
  TableComponent: ComponentType<ITable<T>>;
}

const AdminCrudPage = <T,>({
  items,
  emptyItem,
  title,
  buttonLabel,
  FormComponent,
  TableComponent,
}: IAdminCrudPageProps<T>): ReactElement => {
  const { selectedItem, isEditing, formKey, handleChange, handleDelete, handleCancel, errors, setErrors } =
    useCrud<T>();
  const actionData = useActionData<IBasicAction>();
  const { showAlert } = useAlert();

  useEffect(() => {
    setErrors(actionData?.errors?.fieldErrors || {});
  }, [actionData, setErrors]);

  useEffect(() => {
    if (selectedItem) scrollTop();
  }, [selectedItem]);

  useEffect(() => {
    if (actionData?.success) handleCancel();
  }, [actionData, handleCancel]);

  useEffect(() => {
    if (actionData)
      showAlert({
        entity: actionData.entity,
        action: actionData.action,
        status: actionData.success ? 'success' : 'error',
        errDetails: actionData.errors?.generalError,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <>
      <Stack spacing={theme.layout.gapLarge}>
        {/* Title */}
        <AdminPageTitle
          pageTitle={title}
          buttonLabel={buttonLabel}
          buttonDisabled={isEditing}
          onButtonClick={() => handleChange(emptyItem)}
        />
        {/* Form */}
        {selectedItem && <FormComponent key={formKey} item={selectedItem} onCancel={handleCancel} errors={errors} />}
        {/* Table of items */}

        <TableComponent items={items} onEdit={handleChange} onDelete={handleDelete} />
      </Stack>
    </>
  );
};

export default AdminCrudPage;
