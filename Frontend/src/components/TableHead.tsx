import { TableHead as MUITableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import theme from '../styles/theme';

interface ITableHeadProps {
  headers: string[];
  sortOrder: 'asc' | 'desc';
  onSort?: () => void;
}

const TableHead = ({ headers, onSort, sortOrder }: ITableHeadProps) => (
  <MUITableHead>
    <TableRow sx={{ bgcolor: theme.palette.background.default }}>
      {headers.map((item, idx) => {
        const isSortable = onSort && (item.toLowerCase().includes('datum') || item.toLowerCase().includes('period'));
        return (
          <TableCell
            component="th"
            scope="col"
            align={idx === headers.length - 1 ? 'right' : 'left'}
            key={item}
            sx={{ paddingY: theme.spacing(1), color: theme.palette.text.secondary }}
            onClick={isSortable ? onSort : undefined}
            style={{ cursor: isSortable ? 'pointer' : 'default' }}
          >
            {isSortable ? (
              <TableSortLabel active direction={sortOrder}>
                {item}
              </TableSortLabel>
            ) : (
              item
            )}
          </TableCell>
        );
      })}
    </TableRow>
  </MUITableHead>
);

export default TableHead;
