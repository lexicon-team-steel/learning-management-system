import { ReactElement } from 'react';
import { ListItem, ListItemText, Typography } from '@mui/material';
import { IActivity } from '../utilities/types';
import { formatDate, formatTime } from '../utilities/helpers';

interface IActivityItemProps {
  activity: IActivity;
}

const ActivityItem = ({ activity }: IActivityItemProps): ReactElement => {
  return (
    <ListItem disableGutters disablePadding>
      <ListItemText
        primary={
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {activity.activityType.name}: {activity.name}
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="text.secondary">
            {formatDate(activity.startDate)} {formatTime(activity.endDate)}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default ActivityItem;
