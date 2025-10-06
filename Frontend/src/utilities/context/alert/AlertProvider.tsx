import { useState, ReactNode } from 'react';
import { AlertContext } from './AlertContext';
import AlertMessage from '../../../components/AlertMessage';
import { IAlertOptions } from '../../types';

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<IAlertOptions | null>(null);

  const showAlert = (opts: IAlertOptions) => {
    setOptions(opts);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOptions(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {options && <AlertMessage open={open} onClose={handleClose} {...options} />}
    </AlertContext.Provider>
  );
};
