import { Link, TableCell, TableRow } from '@mui/material';
import { ReactElement } from 'react';
import { IModule } from '../utilities/types';
import theme from '../styles/theme';
import Date from './Date';
import { formatDate } from '../utilities/helpers';
import ActionButtons from './ActionButtons';
import { NavLink } from 'react-router';

interface IModuleTableRowProps {
  module: IModule;
  onEdit: () => void;
  onDelete: () => void;
}
const ModuleTableRow = ({ module, onEdit, onDelete }: IModuleTableRowProps): ReactElement => {
  return (
    <TableRow>
      <TableCell>{module.name}</TableCell>
      <TableCell>
        <Date start={formatDate(module.startDate)} end={formatDate(module.endDate)} />
      </TableCell>
      <TableCell>
        <Link component={NavLink} to={`/admin/modules/${module.id}`} underline="hover">
          Hantera
        </Link>
      </TableCell>
      <TableCell align="right" sx={{ paddingX: theme.spacing(1) }}>
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

export default ModuleTableRow;
