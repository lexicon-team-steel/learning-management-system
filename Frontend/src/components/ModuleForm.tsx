import { ReactElement } from 'react';
import { FormErrorType, IModule } from '../utilities/types';
import { Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import theme from '../styles/theme';

import AdminPageForm from './AdminPageForm';

interface IModuleFormProps {
  onCancel: () => void;
  module: IModule;
  errors?: FormErrorType;
}

interface IStyledTextfield {
  type?: string;
  label: string;
  name: string;
  value: string;
  error?: string;
  required?: boolean;
  rows?: number;
}

const StyledTextField = ({ type = 'text', label, name, value, required = true, error, rows }: IStyledTextfield) => (
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
    rows={rows}
    multiline={rows ? true : false}
  />
);

const ModuleForm = ({ onCancel, module, errors }: IModuleFormProps): ReactElement => {
  const action = module.id ? 'edit' : 'create';
  const title = action === 'create' ? 'Ny modul' : 'Redigera modul';
  const submitLabel = action === 'create' ? 'Skapa' : 'Spara';

  return (
    <AdminPageForm title={title} submitLabel={submitLabel} onCancel={onCancel}>
      <input type="hidden" name="_action" value={action} />
      <input type="hidden" name="id" value={module.id} />
      <Grid container spacing={theme.layout.gap}>
        <Grid size={6}>
          <StyledTextField label="Titel" name="name" value={module.name} error={errors?.name} />
        </Grid>
        <Grid size={12}>
          <StyledTextField
            type="text"
            label="Beskrivning"
            name="description"
            rows={3}
            value={module.description}
            error={errors?.description}
          />
        </Grid>
        <Grid size={3}>
          <DatePicker label="Startdatum" name="startDate" disablePast />
        </Grid>
        <Grid size={3}>
          <DatePicker label="Slutdatum" name="endDate" disablePast />
        </Grid>
      </Grid>
    </AdminPageForm>
  );
};

export default ModuleForm;
