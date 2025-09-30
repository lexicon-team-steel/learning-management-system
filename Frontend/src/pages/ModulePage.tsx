import { ReactElement, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';
import { Stack, Typography } from '@mui/material';
import Card from '../components/Card';
import ModuleActivities from '../components/ModuleActivities';
import theme from '../styles/theme';
import { IActivity, IModule } from '../utilities/types';
import { formatDate } from '../utilities/helpers';
import Date from '../components/Date';

const ModulePage = (): ReactElement => {
  const { module, activities } = useLoaderData();

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <Suspense>
        <Await resolve={module}>
          {(module: IModule) => (
            <Card title={module.name} titleVariant="h1">
              <Typography mb={theme.layout.gap}>{module.description}</Typography>
              <Stack direction="row" spacing={theme.spacing(6)}>
                <Typography variant="body2">Del av kurs:</Typography>
                <Date start={formatDate(module.startDate)} end={formatDate(module.endDate)} />
              </Stack>
            </Card>
          )}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={activities}>{(activities: IActivity[]) => <ModuleActivities items={activities} />}</Await>
      </Suspense>
    </Stack>
  );
};

export default ModulePage;
