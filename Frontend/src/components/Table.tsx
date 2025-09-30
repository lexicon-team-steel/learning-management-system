import { TableContainer, Table as MUITable, Paper } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';

interface ITableProps<T> {
  headers: string[];
  rows: T[];
  renderItem: (item: T) => ReactNode;
  keyField: keyof T;
}

const Table = <T,>({ headers, rows, renderItem, keyField }: ITableProps<T>): ReactElement => {
  return (
    <TableContainer component={Paper}>
      <MUITable sx={{ borderRadius: '8px', overflow: 'hidden' }}>
        <TableHead headers={headers} />
        <TableBody colspan={headers.length} rows={rows} renderItem={renderItem} keyField={keyField} />
      </MUITable>
    </TableContainer>
  );
};

export default Table;
