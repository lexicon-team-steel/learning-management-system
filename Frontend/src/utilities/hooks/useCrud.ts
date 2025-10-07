import { useCallback, useState } from 'react';
import { FormErrorType } from '../types';
import { useSubmit } from 'react-router';

export const useCrud = <T extends { id: string }>() => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [errors, setErrors] = useState<FormErrorType>({});
  const [formKey, setFormKey] = useState<string>(crypto.randomUUID());
  const submit = useSubmit();

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

  const handleDelete = (item: T) => {
    setSelectedItem(null);
    const confirmed = window.confirm('Är du säker på att du vill ta bort detta?');
    if (!confirmed) return;

    submit({ id: String(item.id), _action: 'delete' }, { method: 'post' });
  };

  return {
    formKey,
    selectedItem,
    isEditing: selectedItem !== null,
    errors,
    setErrors,
    handleChange,
    handleCancel,
    handleDelete,
  };
};
