import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import Card from './Card';
import { Form } from 'react-router';
import theme from '../styles/theme';
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { ICourse } from '../utilities/types';
import { translateRole } from '../utilities/helpers';
import ClearIcon from '@mui/icons-material/FilterAltOff';

interface IUserFilterProps {
  initName: string;
  initRole: string;
  initCourseId: string;
  courses: ICourse[];
  onSubmit: (name?: string, role?: string, courseId?: string) => void;
  onReset: () => void;
}

const UserFilter = ({
  initName,
  initRole,
  initCourseId,
  courses,
  onSubmit,
  onReset,
}: IUserFilterProps): ReactElement => {
  const [name, setName] = useState<string>(initName);
  const [role, setRole] = useState<string>(initRole);
  const [courseId, setCourseId] = useState<string>(initCourseId);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(name, role, courseId);
  };

  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={theme.layout.gap} alignItems="stretch">
          <Grid size={3}>
            <TextField
              label="Namn"
              name="name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="roll-label">Roll</InputLabel>
              <Select
                labelId="role-label"
                id="role-select"
                name="role"
                label="Roll"
                value={role}
                onChange={(e: SelectChangeEvent) => setRole(e.target.value)}
              >
                <MenuItem value="">- Välj -</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">{translateRole('Teacher')}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="course-label">Kurs</InputLabel>
              <Select
                labelId="course-label"
                id="course-select"
                name="courseId"
                label="Kurs"
                value={courseId}
                onChange={(e: SelectChangeEvent) => setCourseId(e.target.value)}
              >
                <MenuItem value="">- Välj -</MenuItem>
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={2}>
            <Button type="submit" variant="contained" fullWidth size="small" sx={{ height: '100%' }}>
              Filtrera
            </Button>
          </Grid>
          <Grid size={1}>
            <Button type="reset" variant="outlined" fullWidth size="small" sx={{ height: '100%' }} onClick={onReset}>
              {' '}
              <ClearIcon />
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Card>
  );
};

export default UserFilter;
