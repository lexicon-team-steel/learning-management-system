import { TableCell, TableRow } from '@mui/material';
import { ReactElement } from 'react';
import { ICourse } from '../utilities/types';
import theme from '../styles/theme';
import Date from './Date';
import { formatDate } from '../utilities/helpers';
import ActionButtons from './ActionButtons';

interface ICourseTableRowProps {
  course: ICourse;
  onEdit: () => void;
  onDelete: () => void;
}
const CourseTableRow = ({ course, onEdit, onDelete }: ICourseTableRowProps): ReactElement => {
  return (
    <TableRow>
      <TableCell>{course.name}</TableCell>
      <TableCell>
        <Date start={formatDate(course.startDate)} end={formatDate(course.endDate)} />
      </TableCell>
      <TableCell align="right" sx={{ paddingX: theme.spacing(1) }}>
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

export default CourseTableRow;
