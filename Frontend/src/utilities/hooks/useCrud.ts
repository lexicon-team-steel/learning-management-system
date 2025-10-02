import { useState } from 'react';

export const useCrud = <T>() => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleChange = (item: T) => setSelectedItem(item);
  const handleCancel = () => setSelectedItem(null);
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
    handleChange,
    handleCancel,
    handleSave,
    handleDelete,
  };
};
