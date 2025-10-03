import { Button, Stack, Typography } from '@mui/material';
import { ReactElement, ReactNode } from 'react';
import theme from '../styles/theme';
import { Form } from 'react-router';
import Card from './Card';

interface IAdminPageFormProps {
  title: string;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel: () => void;
  children: ReactNode;
}

const AdminPageForm = ({
  title,
  submitLabel = 'Spara',
  cancelLabel = 'Avbryt',
  onCancel,
  children,
}: IAdminPageFormProps): ReactElement => {
  return (
    <Card>
      <Typography variant="h2" sx={{ marginBottom: theme.layout.gap }}>
        {title}
      </Typography>
      <Form method="post" noValidate>
        <Stack gap={theme.layout.gapLarge}>
          {children}
          <Stack direction="row" spacing={theme.layout.gap} justifyContent="flex-end">
            <Button variant="outlined" onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button variant="contained" type="submit">
              {submitLabel}
            </Button>
          </Stack>
        </Stack>
      </Form>
    </Card>
  );
};

export default AdminPageForm;
