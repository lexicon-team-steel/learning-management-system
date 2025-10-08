import { ReactElement, useState } from 'react';
import { FormErrorType, IActivity, IActivityType } from '../utilities/types';
import { Box, Grid, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import theme from '../styles/theme';
import AdminPageForm from './AdminPageForm';
import dayjs, { Dayjs } from 'dayjs';
import TextInput from './TextInput';

interface IActivityFormProps {
  onCancel: () => void;
  activity: IActivity;
  activityTypes: IActivityType[];
  errors?: FormErrorType;
}

const ActivityForm = ({ onCancel, activity, activityTypes, errors = {} }: IActivityFormProps): ReactElement => {
  const action = activity.id ? 'update' : 'create';
  const title = action === 'create' ? 'Ny aktivitet' : 'Redigera aktivitet';
  const submitLabel = action === 'create' ? 'Skapa' : 'Spara';

  const hasExistingDates = !!activity.startDate && !!activity.endDate;

  const [date, setDate] = useState<Dayjs | null>(hasExistingDates ? dayjs(activity.startDate).startOf('day') : null);
  const [startTime, setStartTime] = useState<Dayjs | null>(hasExistingDates ? dayjs(activity.startDate) : null);
  const [endTime, setEndTime] = useState<Dayjs | null>(hasExistingDates ? dayjs(activity.endDate) : null);
  const [activityTypeId, setActivityTypeId] = useState<string>(activity.activityType.id || '');

  return (
    <AdminPageForm title={title} submitLabel={submitLabel} onCancel={onCancel}>
      <input type="hidden" name="_action" value={action} />
      <input type="hidden" name="id" value={activity.id} />
      <input type="hidden" name="date" value={date?.isValid() ? date.format('YYYY-MM-DD') : ''} />
      <input type="hidden" name="startTime" value={startTime?.isValid() ? startTime.format('HH:mm') : ''} />
      <input type="hidden" name="endTime" value={endTime?.isValid() ? endTime.format('HH:mm') : ''} />
      <input type="hidden" name="activityTypeId" value={activityTypeId} />

      <Grid container spacing={theme.layout.gap}>
        <Grid size={12}>
          <TextInput label="Titel" name="name" value={activity.name} error={errors.name} />
        </Grid>

        <Grid size={12}>
          <TextInput
            type="text"
            label="Beskrivning"
            name="description"
            minRows={3}
            value={activity.description}
            error={errors.description}
          />
        </Grid>

        <Grid size={12}>
          <FormControl fullWidth error={!!errors.activityType}>
            <InputLabel id="activityType-label">Aktivitetstyp</InputLabel>
            <Select
              label="Aktivitetstyp"
              name="activityType"
              value={activityTypeId}
              onChange={(e) => setActivityTypeId(e.target.value)}
            >
              {activityTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
            {errors.activityType && <FormHelperText>{errors.activityType}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid size={12}>
          <Box display="flex" gap={theme.layout.gap}>
            <DatePicker
              label="Datum *"
              value={date}
              onChange={(value) => setDate(value)}
              format="DD/MM/YYYY"
              disablePast
              slotProps={{
                textField: {
                  error: !!errors.date,
                  helperText: errors.date,
                },
              }}
            />

            <TimePicker
              label="Starttid *"
              value={startTime}
              onChange={(value) => setStartTime(value)}
              format="HH:mm"
              ampm={false}
              slotProps={{
                textField: {
                  error: !!errors.startTime,
                  helperText: errors.startTime,
                },
              }}
            />

            <TimePicker
              label="Sluttid *"
              value={endTime}
              onChange={(value) => setEndTime(value)}
              minTime={startTime || undefined}
              format="HH:mm"
              ampm={false}
              slotProps={{
                textField: {
                  error: !!errors.endTime,
                  helperText: errors.endTime,
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </AdminPageForm>
  );
};

export default ActivityForm;
