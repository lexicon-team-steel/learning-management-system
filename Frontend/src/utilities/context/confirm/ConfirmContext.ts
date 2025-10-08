import { createContext, useContext } from 'react';
import { Entity } from '../../types';

export type ConfirmOptions = {
  entity: Entity;
  onConfirm: () => void;
};

export interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => void;
}
export const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const useConfirm = (): ConfirmContextType => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
};
