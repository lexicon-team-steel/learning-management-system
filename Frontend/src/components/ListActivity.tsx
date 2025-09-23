import { ReactElement } from 'react';
import { IActivity } from './boxes/mockData';
import { ListItem, ListItemText, styled, Typography } from '@mui/material';

interface IListActivityProps {
  activity: IActivity;
}

const StyledActivity = styled(Typography)(() => ({
  fontWeight: 500,
}));
const StyledDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const ListActivity = ({ activity }: IListActivityProps): ReactElement => {
  return (
    <ListItem disableGutters disablePadding>
      <ListItemText
        primary={
          <StyledActivity variant="body1">
            {activity.type}: {activity.name}
          </StyledActivity>
        }
        secondary={
          <StyledDate variant="body2">
            {activity.date} {activity.timeEnd}
          </StyledDate>
        }
      />
    </ListItem>
  );
};

export default ListActivity;
