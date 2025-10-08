import { ReactElement, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router';
import { Stack, Typography } from '@mui/material';
import Card from '../components/Card';
import ModuleActivities from '../components/ModuleActivities';
import theme from '../styles/theme';
import { IActivity, IModule } from '../utilities/types';
import { formatDate, sortByDate } from '../utilities/helpers';
import Date from '../components/Date';
import SkeletonList from '../components/skelotons/SkeletonList';
import SkeletonOneCol from '../components/skelotons/SkeltonOneCol';
import BackLink from '../components/BackLink';

const ModulePage = (): ReactElement => {
  const { module, activities } = useLoaderData();

  return (
    <Stack spacing={theme.layout.gapLarge}>
      <Suspense fallback={<SkeletonOneCol />}>
        <Await resolve={module}>
          {(module: IModule) => (
            <>
              <BackLink name={module.courseName} />
              <Card title={module.name} titleVariant="h1">
                <Typography mb={theme.layout.gap}>{module.description}</Typography>
                <Stack direction="row" spacing={theme.spacing(6)} alignItems="center">
                  <Typography variant="body2">
                    Del av kurs:{' '}
                    <Typography component="span" fontWeight="bold">
                      {module.courseName}
                    </Typography>
                  </Typography>
                  <Date start={formatDate(module.startDate)} end={formatDate(module.endDate)} />
                </Stack>
              </Card>
            </>
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<SkeletonList />}>
        <Await resolve={activities}>
          {(activities: IActivity[]) => {
            const sortedActivites = sortByDate(activities, 'startDate');
            return <ModuleActivities items={sortedActivites} />;
          }}
        </Await>
      </Suspense>
    </Stack>
  );
};

export default ModulePage;
