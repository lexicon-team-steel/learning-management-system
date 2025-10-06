import { useCallback, useState } from 'react';
import { FormErrorType } from '../types';

export const useCrud = <T>() => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [errors, setErrors] = useState<FormErrorType>({});
  const [formKey, setFormKey] = useState<string>(crypto.randomUUID());

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
    setSelectedItem(null);
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
