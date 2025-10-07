import { ReactElement, useState } from 'react';
import { FormErrorType, IActivity } from '../utilities/types';
import { Box, Grid } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import theme from '../styles/theme';
import AdminPageForm from './AdminPageForm';
import dayjs, { Dayjs } from 'dayjs';
import TextInput from './TextInput';

interface IModuleFormProps {
  onCancel: () => void;
  activity: IActivity;
  errors?: FormErrorType;
}

const ActivityForm = ({ onCancel, activity, errors }: IModuleFormProps): ReactElement => {
  const action = activity.id ? 'edit' : 'create';
  const title = action === 'create' ? 'Ny modul' : 'Redigera modul';
  const submitLabel = action === 'create' ? 'Skapa' : 'Spara';

  const [date, setStartDate] = useState<Dayjs | null>(dayjs(activity.startDate));

  return (
    <AdminPageForm title={title} submitLabel={submitLabel} onCancel={onCancel}>
      <input type="hidden" name="_action" value={action} />
      <input type="hidden" name="id" value={activity.id} />
      <input type="hidden" name="startDate" value={date?.isValid() ? date.format('YYYY-MM-DD') : ''} />
      <Grid container spacing={theme.layout.gap}>
        <Grid size={12}>
          <TextInput label="Titel" name="name" value={activity.name} error={errors?.name} />
        </Grid>
        <Grid size={12}>
          <TextInput
            type="text"
            label="Beskrivning"
            name="description"
            minRows={3}
            value={activity.description}
            error={errors?.description}
          />
        </Grid>
        <Grid size={12}>
          <Box display={'flex'} gap={theme.layout.gap}>
            <DatePicker
              label="Startdatum *"
              value={date}
              onChange={(date) => setStartDate(date)}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  error: !!errors?.startDate,
                  helperText: errors?.startDate,
                },
              }}
              disablePast
            />
            <TimePicker
              label="Start"
              value={date}
              onChange={(date) => setStartDate(date)}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  error: !!errors?.startDate,
                  helperText: errors?.startDate,
                },
              }}
              disablePast
            />
          </Box>
        </Grid>
      </Grid>
    </AdminPageForm>
  );
};

export default ActivityForm;
