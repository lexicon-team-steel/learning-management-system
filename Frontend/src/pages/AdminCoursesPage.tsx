import { ReactElement } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import theme from '../styles/theme';
import PlusIcon from '@mui/icons-material/Add';
import CourseListBoard from '../components/CourseListBoard';
import { useLoaderData } from 'react-router';

interface IAdminProps {
  pageTitle: string;
  buttonLabel: string;
  buttonDisabled?: boolean;
  onButtonClick?: () => void;
}

const AdminTitle = ({ pageTitle, buttonLabel, buttonDisabled, onButtonClick }: IAdminProps): ReactElement => (
  <Box display="flex" justifyContent="space-between" alignItems="center" gap={theme.layout.gap}>
    <Typography variant="h1">{pageTitle}</Typography>
    <Button startIcon={<PlusIcon />} variant="contained" disabled={buttonDisabled} onClick={onButtonClick}>
      {buttonLabel}
    </Button>
  </Box>
);

const AdminCoursesPage = (): ReactElement => {
  const { courses } = useLoaderData();
  return (
    <Stack spacing={theme.layout.gapLarge}>
      <AdminTitle pageTitle="Hantera kurser" buttonLabel="Skapa ny kurs" />
      <CourseListBoard courses={courses} />
    </Stack>
  );
};

export default AdminCoursesPage;
