import { TextField } from '@mui/material';
import { ReactElement } from 'react';

interface ITextInput {
  type?: string;
  label: string;
  name: string;
  value: string;
  error?: string;
  required?: boolean;
  minRows?: number;
}

const TextInput = ({
  type = 'text',
  label,
  name,
  value,
  required = true,
  error,
  minRows,
}: ITextInput): ReactElement => (
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
    minRows={minRows}
    multiline={minRows ? true : false}
  />
);

export default TextInput;
