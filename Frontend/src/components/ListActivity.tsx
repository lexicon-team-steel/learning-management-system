import { ReactElement } from 'react';
import { IActivity } from './boxes/mockData';
import { ListItem, ListItemText, Typography } from '@mui/material';

interface IListActivityProps {
  activity: IActivity;
}

const ListActivity = ({ activity }: IListActivityProps): ReactElement => {
  return (
    <ListItem>
      <ListItemText
        primary={
          <Typography variant="h5">
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

export default ListActivity;
