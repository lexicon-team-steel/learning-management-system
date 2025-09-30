import { TableHead as MUITableHead, TableRow, TableCell } from '@mui/material';
import theme from '../styles/theme';

interface ITableHeadProps {
  headers: string[];
}

const TableHead = ({ headers }: ITableHeadProps) => (
  <MUITableHead>
    <TableRow sx={{ bgcolor: theme.palette.background.default }}>
      {headers.map((item) => (
        <TableCell
          component="th"
          scope="col"
          key={item}
          sx={{ paddingY: theme.spacing(1), color: theme.palette.text.secondary }}
        >
          {item}
        </TableCell>
      ))}
    </TableRow>
  </MUITableHead>
);

export default TableHead;
