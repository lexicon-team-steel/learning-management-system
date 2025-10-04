import { ComponentType, ReactElement, Suspense, useEffect } from 'react';
import { Await, useActionData } from 'react-router';
import { IBasicAction, IForm, ITable } from '../utilities/types';
import { Skeleton, Stack } from '@mui/material';
import theme from '../styles/theme';
import { useCrud } from '../utilities/hooks/useCrud';
import AdminPageTitle from '../components/AdminPageTitle';
import { scrollTop } from '../utilities/helpers';

interface IAdminCrudPageProps<T> {
  itemsPromise: Promise<T[]>;
  emptyItem: T;
  title: string;
  buttonLabel: string;
  FormComponent: ComponentType<IForm<T>>;
  TableComponent: ComponentType<ITable<T>>;
}

const AdminCrudPage = <T,>({
  itemsPromise,
  emptyItem,
  title,
  buttonLabel,
  FormComponent,
  TableComponent,
}: IAdminCrudPageProps<T>): ReactElement => {
  const { selectedItem, isEditing, formKey, handleChange, handleDelete, handleCancel, errors, setErrors } =
    useCrud<T>();
  const actionData = useActionData<IBasicAction>();

  useEffect(() => {
    setErrors(actionData?.errors?.fieldErrors || {});
  }, [actionData, setErrors]);

  useEffect(() => {
    if (selectedItem) scrollTop();
  }, [selectedItem]);

  useEffect(() => {
    if (actionData?.success) handleCancel();
  }, [actionData]);

  return (
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
      <Suspense fallback={<Skeleton variant="rounded" height={150} />}>
        <Await resolve={itemsPromise}>
          {(items: T[]) => <TableComponent items={items} onEdit={handleChange} onDelete={handleDelete} />}
        </Await>
      </Suspense>
    </Stack>
  );
};

export default AdminCrudPage;
