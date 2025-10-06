import { useCallback, useState } from 'react';
import { FormErrorType } from '../types';
import { useFetcher } from 'react-router';

export const useCrud = <T extends { id: string }>() => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [errors, setErrors] = useState<FormErrorType>({});
  const [formKey, setFormKey] = useState<string>(crypto.randomUUID());
  const fetcher = useFetcher();

  const handleChange = (item: T) => {
    setSelectedItem(item);
    setErrors({});
    setFormKey(crypto.randomUUID());
  };

  const handleCancel = useCallback(() => {
    setSelectedItem(null);
    setErrors({});
    setFormKey(crypto.randomUUID());
  }, []);

  const handleSave = (item: T) => {
    setSelectedItem(null);
    /* API call */
  };
  const handleDelete = (item: T) => {
    if (confirm(`Vill du verkligen ta bort det?`)) {
      fetcher.submit({ id: item.id, _action: 'delete' }, { method: 'post' });
    }
    /* API call*/
  };

  return {
    formKey,
    selectedItem,
    isEditing: selectedItem !== null,
    errors,
    setErrors,
    handleChange,
    handleCancel,
    handleSave,
    handleDelete,
  };
};
