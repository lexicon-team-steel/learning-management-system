import { ReactElement } from 'react';
import { IActivity } from './boxes/mockData';
import { Container } from '@mui/material';
import ListActivity from './ListActivity';

interface IListActivitiesProps {
  activities: IActivity[];
}

const Activities = ({ activities }: IListActivitiesProps): ReactElement => {
  return (
    <Container>
      {activities.map((act) => (
        <ListActivity key={act.name} activity={act} />
      ))}
    </Container>
  );
};

export default Activities;
