import { ReactElement } from 'react';
import { IActivity } from '../utilities/data/mockData';
import { ListItem, ListItemText, Typography } from '@mui/material';

interface IActivityItemProps {
  activity: IActivity;
}

const ActivityItem = ({ activity }: IActivityItemProps): ReactElement => {
  return (
    <ListItem disableGutters disablePadding>
      <ListItemText
        primary={
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {activity.type}: {activity.name}
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="text.secondary">
            {activity.date} {activity.timeEnd}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default ActivityItem;
