import { TableCell, TableRow, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { IActivity } from '../utilities/types';
import theme from '../styles/theme';
import ActionButtons from './ActionButtons';
import { formatDate, formatTime } from '../utilities/helpers';

interface IActivityItem {
  activity: IActivity;
  onEdit: () => void;
  onDelete: () => void;
}
const ActivityTableRow = ({ activity, onEdit, onDelete }: IActivityItem): ReactElement => {
  return (
    <TableRow>
      <TableCell>{activity.name}</TableCell>
      <TableCell>{activity.activityType.name}</TableCell>
      <TableCell>
        <Typography>{formatDate(activity.startDate)}</Typography>
        <Typography
          variant="body2"
          color={theme.palette.text.secondary}
        >{`${formatTime(activity.startDate)} -${formatTime(activity.endDate)}`}</Typography>
      </TableCell>
      <TableCell align="right" sx={{ paddingX: theme.spacing(1) }}>
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

export default ActivityTableRow;
