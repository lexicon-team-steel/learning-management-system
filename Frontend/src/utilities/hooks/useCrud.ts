import { useState } from 'react';
import { FormErrorType } from '../types';

export const useCrud = <T>() => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [errors, setErrors] = useState<FormErrorType>({});

  const handleChange = (item: T) => {
    setSelectedItem(item);
    setErrors({});
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setErrors({});
  };

  const handleSave = (item: T) => {
    setSelectedItem(null);
    /* API call */
  };
  const handleDelete = (item: T) => {
    setSelectedItem(null);
    /* API call*/
  };

  return {
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
