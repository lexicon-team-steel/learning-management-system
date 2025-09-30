import { TableBody as MUITableBody, TableRow, TableCell } from '@mui/material';
import { Fragment, ReactElement, ReactNode } from 'react';
import theme from '../styles/theme';

interface ITableBodyProps<T> {
  colspan: number;
  rows: T[];
  renderItem: (item: T) => ReactNode;
  keyField: keyof T;
}

const TableBody = <T,>({ colspan, rows, renderItem, keyField }: ITableBodyProps<T>): ReactElement => {
  if (rows.length === 0)
    return (
      <MUITableBody>
        <TableRow>
          <TableCell colSpan={colspan} align="center">
            Inga resultat
          </TableCell>
        </TableRow>
      </MUITableBody>
    );
  return (
    <MUITableBody sx={{ bgcolor: theme.palette.background.paper, 'tr:last-child td': { border: 0 } }}>
      {rows.map((item) => (
        <Fragment key={item[keyField] as string}>{renderItem(item)}</Fragment>
      ))}
    </MUITableBody>
  );
};

export default TableBody;
