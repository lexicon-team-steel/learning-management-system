import { ComponentType, ReactElement, useEffect, useState } from 'react';
import { useActionData } from 'react-router';
import { IBasicAction, IForm, ITable } from '../utilities/types';
import { Stack } from '@mui/material';
import theme from '../styles/theme';
import { useCrud } from '../utilities/hooks/useCrud';
import AdminPageTitle from '../components/AdminPageTitle';
import { scrollTop } from '../utilities/helpers';
import AlertMessage from './AlertMessage';

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
  const [showAlert, setShowAlert] = useState<boolean>(!!actionData);

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
    if (actionData) setShowAlert(true);
  }, [actionData]);

  const Alert = showAlert && actionData && (
    <AlertMessage
      entity={actionData.entity}
      action={actionData.action}
      status={actionData.success ? 'success' : 'error'}
      errDetails={actionData.errors?.generalError}
      onClose={() => setShowAlert(false)}
      open={true}
    />
  );

  return (
    <>
      {Alert}
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
