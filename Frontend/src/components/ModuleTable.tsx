import { ReactElement } from 'react';
import Table from './Table';
import { Entity, IModule } from '../utilities/types';
import ModuleTableRow from './ModuleTableRow';

interface IModuleTableProps {
  modules: IModule[];
  onEdit: (module: IModule) => void;
  onDelete: (module: IModule, entity: Entity) => void;
}

const ModuleTable = ({ modules, onEdit, onDelete }: IModuleTableProps): ReactElement => (
  <Table
    headers={['Namn', 'Period', 'Aktiviteter', 'Åtgärder']}
    keyField="id"
    rows={modules}
    sortableField="startDate"
    renderItem={(module: IModule) => (
      <ModuleTableRow module={module} onEdit={() => onEdit(module)} onDelete={() => onDelete(module, 'module')} />
    )}
  ></Table>
);

export default ModuleTable;
