import Card from './Card';
import { mockCourse } from '../utilities/data/mockData';
import EntityCard from './EntityCard';
import { formatDate } from '../utilities/helpers';
import { Stack } from '@mui/material';
import theme from '../styles/theme';

const ModuleActivities = () => {
  const items = mockCourse.activities;

  return (
    <Card title="Aktivititer " titleVariant="h2">
      <Stack spacing={theme.spacing(2)}>
        {items.map((item) => (
          <EntityCard
            key={item.name}
            title={`${item.type}: ${item.name}`}
            text={item.description}
            date={{ start: formatDate(item.date) }}
            time={{
              start: item.timeStart,
              end: item.timeEnd,
            }}
          />
        ))}
      </Stack>
    </Card>
  );
};

export default ModuleActivities;
