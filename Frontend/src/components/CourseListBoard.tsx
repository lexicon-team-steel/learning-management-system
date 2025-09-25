import { ReactElement } from 'react';
import { Grid } from '@mui/material';
import EntityCard from './EntityCard';
import { mockCourses } from '../utilities/data/mockData';
import CustomCard from './Card';

//This component is open for modification :)

const CourseListBoard = (): ReactElement => {
  return (
    <CustomCard title="Alla kurser">
      <Grid container spacing={2} columns={3}>
        {mockCourses.map((mc) => (
          <Grid size={1}>
            <EntityCard
              key={mc.id}
              title={mc.course}
              text={mc.info}
              date={{ start: mc.dateStart, end: mc.dateEnd }}
              link="/course"
            />
          </Grid>
        ))}
      </Grid>
    </CustomCard>
  );
};

export default CourseListBoard;
