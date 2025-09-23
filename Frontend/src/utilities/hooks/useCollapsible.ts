import { useState } from 'react';

const useCollapse = (init: boolean) => {
  const [collapsed, setCollapsed] = useState<boolean>(init);
  const toggleCollapse = () => setCollapsed((collapsed) => !collapsed);

  return { collapsed, toggleCollapse };
};

export { useCollapse };
