import { ReactElement, useState } from 'react';
import { FormErrorType, ICourse } from '../utilities/types';
import { Box, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import theme from '../styles/theme';
import AdminPageForm from './AdminPageForm';

interface IStyledTextfield {
  type?: string;
  label: string;
  name: string;
  value: string;
  error?: string;
  required?: boolean;
}

const StyledTextField = ({ type = 'text', label, name, value, required = true, error }: IStyledTextfield) => (
  <TextField
    type={type}
    label={label}
    name={name}
    variant="outlined"
    defaultValue={value}
    fullWidth
    required={required}
    error={!!error}
    helperText={error}
  />
);

const StyledAreaField = ({ type = 'text', label, name, value, required = true, error }: IStyledTextfield) => (
  <TextField
    multiline
    type={type}
    label={label}
    name={name}
    variant="outlined"
    defaultValue={value}
    fullWidth
    required={required}
    error={!!error}
    helperText={error}
    minRows={3}
  />
);

interface ICourseFormProps {
  onCancel: () => void;
  course: ICourse;
  errors: FormErrorType;
}

const CourseForm = ({ onCancel, course, errors }: ICourseFormProps): ReactElement => {
  const action = course.id ? 'update' : 'create';
  const title = action === 'create' ? 'Ny kurs' : 'Redigera kurs';
  const submitLabel = action === 'create' ? 'Skapa' : 'Spara';

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(course.startDate));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(course.endDate));

  return (
    <AdminPageForm title={title} submitLabel={submitLabel} onCancel={onCancel}>
      <input type="hidden" name="_action" value={action} /> {/* Not used now but my be of use in api call later? */}
      <input type="hidden" name="id" value={course.id} /> {/* Not used now but my be of use in api call later? */}
      <input type="hidden" name="startDate" value={startDate?.isValid() ? startDate.format('YYYY-MM-DD') : ''} />
      <input type="hidden" name="endDate" value={endDate?.isValid() ? endDate.format('YYYY-MM-DD') : ''} />
      <Grid container spacing={theme.layout.gap}>
        <Grid size={12}>
          <StyledTextField label="Titel" name="name" value={course.name} error={errors?.name} />
        </Grid>
        <Grid size={12}>
          <StyledAreaField
            label="Beskrivning"
            name="description"
            value={course.description}
            error={errors?.description}
          />
        </Grid>
        <Grid size={12}>
          <Box display={'flex'} gap={theme.layout.gap}>
            <DatePicker
              label="Startdatum *"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  error: !!errors?.startDate,
                  helperText: errors?.startDate,
                },
              }}
            />
            <DatePicker
              label="Slutdatum *"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  error: !!errors?.endDate,
                  helperText: errors?.endDate,
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </AdminPageForm>
  );
};

export default CourseForm;
