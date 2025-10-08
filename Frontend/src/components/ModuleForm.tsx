import { ReactElement, useState } from 'react';
import { FormErrorType, IModule } from '../utilities/types';
import { Box, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import theme from '../styles/theme';
import AdminPageForm from './AdminPageForm';
import dayjs, { Dayjs } from 'dayjs';
import TextInput from './TextInput';

interface IModuleFormProps {
  onCancel: () => void;
  module: IModule;
  errors?: FormErrorType;
}

const ModuleForm = ({ onCancel, module, errors }: IModuleFormProps): ReactElement => {
  const action = module.id ? 'edit' : 'create';
  const title = action === 'create' ? 'Ny modul' : 'Redigera modul';
  const submitLabel = action === 'create' ? 'Skapa' : 'Spara';

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(module.startDate));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(module.endDate));

  return (
    <AdminPageForm title={title} submitLabel={submitLabel} onCancel={onCancel}>
      <input type="hidden" name="_action" value={action} />
      <input type="hidden" name="id" value={module.id} />
      <input type="hidden" name="startDate" value={startDate?.isValid() ? startDate.format('YYYY-MM-DD') : ''} />
      <input type="hidden" name="endDate" value={endDate?.isValid() ? endDate.format('YYYY-MM-DD') : ''} />
      <Grid container spacing={theme.layout.gap}>
        <Grid size={12}>
          <TextInput label="Titel" name="name" value={module.name} error={errors?.name} />
        </Grid>
        <Grid size={12}>
          <TextInput
            type="text"
            label="Beskrivning"
            name="description"
            minRows={3}
            value={module.description}
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
              disablePast
            />
            <DatePicker
              label="Slutdatum *"
              value={endDate}
              minDate={startDate || undefined}
              onChange={(date) => setEndDate(date)}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  error: !!errors?.endDate,
                  helperText: errors?.endDate,
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

export default ModuleForm;
