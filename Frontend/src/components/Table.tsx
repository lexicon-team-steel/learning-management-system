import { TableContainer, Table as MUITable, Paper } from '@mui/material';
import { ReactElement, ReactNode, useMemo, useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';

interface ITableProps<T> {
  headers: string[];
  rows: T[];
  renderItem: (item: T) => ReactNode;
  keyField: keyof T;
  sortableField?: keyof T;
}

const Table = <T,>({ headers, rows, renderItem, keyField, sortableField }: ITableProps<T>): ReactElement => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const sortedRows = useMemo(() => {
    if (!sortableField) return rows;

    return [...rows].sort((a, b) => {
      const valA = a[sortableField];
      const valB = b[sortableField];

      if (valA == null || valB == null) return 0;

      const dateA = new Date(valA as unknown as string).getTime();
      const dateB = new Date(valB as unknown as string).getTime();

      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [rows, sortableField, sortOrder]);

  return (
    <TableContainer component={Paper}>
      <MUITable sx={{ borderRadius: '8px', overflow: 'hidden' }}>
        <TableHead headers={headers} onSort={sortableField ? handleSort : undefined} sortOrder={sortOrder} />
        <TableBody colspan={headers.length} rows={sortedRows} renderItem={renderItem} keyField={keyField} />
      </MUITable>
    </TableContainer>
  );
};

export default Table;
