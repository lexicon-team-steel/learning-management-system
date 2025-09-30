import Card from './Card';
import EntityCard from './EntityCard';
import { formatDate, formatTime, sortByDate } from '../utilities/helpers';
import { Stack } from '@mui/material';
import theme from '../styles/theme';
import { IActivity } from '../utilities/types';

interface ModuleActivitiesProps {
  items: IActivity[];
}

const ModuleActivities = ({ items }: ModuleActivitiesProps) => {
  const sortedItems = sortByDate(items, 'startDate');

  return (
    <Card title="Aktivititer " titleVariant="h2">
      <Stack spacing={theme.spacing(2)}>
        {sortedItems.map((item) => (
          <EntityCard
            key={item.name}
            title={`${item.activityType.name}: ${item.name}`}
            text={item.description}
            date={{ start: formatDate(item.startDate) }}
            time={{
              start: formatTime(item.startDate),
              end: formatTime(item.endDate),
            }}
          />
        ))}
      </Stack>
    </Card>
  );
};

export default ModuleActivities;
