import Card from './Card';
import { mockCourse } from '../utilities/data/mockData';
import EntityCard from './EntityCard';
import { formatDate, formatTime } from '../utilities/dateTime';

const ModuleActivities = () => {
  const items = mockCourse.activities;

  return (
    <Card title="Aktivititer " titleVariant="h2">
      {items.map((item) => (
        <EntityCard
          key={item.name}
          title={item.name}
          type={item.type}
          text={item.description}
          link="/sanbox" // temp link
          date={{ start: formatDate(item.date) }}
          time={{
            start: formatTime(item.timeStart),
            end: formatTime(item.timeEnd),
          }}
        />
      ))}
    </Card>
  );
};

export default ModuleActivities;
