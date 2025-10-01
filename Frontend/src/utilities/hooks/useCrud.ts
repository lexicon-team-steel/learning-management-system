import { useState } from 'react';

export const useCrud = <T>(initialItems: T[] /*, baseUrl: ''*/) => {
  const [items, setItems] = useState<T[]>(initialItems);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const handleChange = (item: T) => setSelectedItem(item);
  const handleCancel = () => setSelectedItem(null);
  const handleSave = (item: T) => {
    setSelectedItem(null);
    /* API call */
  };
  const handleDelete = (item: T) => {
    setSelectedItem(null);
    console.log(items);
    /* API call*/
  };

  return {
    items,
    selectedItem,
    isEditing: selectedItem !== null,
    handleChange,
    handleCancel,
    handleSave,
    handleDelete,
  };
};
