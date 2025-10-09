import { createContext, useContext } from 'react';
import { IAlertOptions } from '../../types';

export interface AlertContextType {
  showAlert: (options: IAlertOptions) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within an AlertProvider');
  return context;
};
