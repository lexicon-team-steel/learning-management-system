import { ReactElement } from 'react';
import { Grid } from '@mui/material';
import BasicCard from './BasicCard';
import EntityCard from './EntityCard';
import { mockCourses } from '../utilities/data/mockData';

const CoursesBoard = (): ReactElement => {
  return (
    <BasicCard title="Alla kurser">
      <Grid container spacing={2} columns={3}>
        {mockCourses.map((mc) => (
          <Grid size={1}>
            <EntityCard
              title={mc.course}
              text={mc.info}
              date={{ start: mc.dateStart, end: mc.dateEnd }}
              link="/course"
            />
          </Grid>
        ))}
      </Grid>
    </BasicCard>
  );
};

export default CoursesBoard;
