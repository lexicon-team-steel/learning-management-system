import { ReactElement, ReactNode, useCallback, useState } from 'react';
import { ConfirmContext } from './ConfirmContext';
import ConfirmDialog from '../../../components/ConfirmDialog';
import { ConfirmOptions } from '../../types';

const ConfirmProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const confirm = useCallback((opts: ConfirmOptions) => {
    setOptions(opts);
    setOpen(true);
  }, []);

  const handleConfirm = () => {
    options?.onConfirm();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setOptions(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {options && <ConfirmDialog open={open} entity={options.entity} onClose={handleClose} onConfirm={handleConfirm} />}
    </ConfirmContext.Provider>
  );
};

export default ConfirmProvider;
