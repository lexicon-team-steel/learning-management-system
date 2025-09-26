import Card from './Card';
import { mockCourse } from '../utilities/data/mockData';
import EntityCard from './EntityCard';
import { formatDate, formatTime } from '../utilities/helpers';
import { Stack, styled } from '@mui/material';

const StyledStack = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ModuleActivities = () => {
  const items = mockCourse.activities;

  return (
    <Card title="Aktivititer " titleVariant="h2">
      <StyledStack>
        {items.map((item) => (
          <EntityCard
            key={item.name}
            title={`${item.type}: ${item.name}`}
            text={item.description}
            date={{ start: formatDate(item.date) }}
            time={{
              start: formatTime(item.timeStart),
              end: formatTime(item.timeEnd),
            }}
          />
        ))}
      </StyledStack>
    </Card>
  );
};

export default ModuleActivities;
