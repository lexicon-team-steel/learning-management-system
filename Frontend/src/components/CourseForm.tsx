import { ReactElement, useState } from 'react';
import { FormErrorType, ICourse } from '../utilities/types';
import { Box, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import theme from '../styles/theme';
import AdminPageForm from './AdminPageForm';
import TextInput from './TextInput';

interface ICourseFormProps {
  onCancel: () => void;
  course: ICourse;
  errors: FormErrorType;
}

const CourseForm = ({ onCancel, course, errors }: ICourseFormProps): ReactElement => {
  const action = course.id ? 'edit' : 'create';
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
          <TextInput label="Titel" name="name" value={course.name} error={errors?.name} />
        </Grid>
        <Grid size={12}>
          <TextInput
            label="Beskrivning"
            name="description"
            minRows={3}
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
              disablePast
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
              minDate={startDate || undefined}
              onChange={(date) => setEndDate(date)}
              format="DD/MM/YYYY"
              disablePast
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
