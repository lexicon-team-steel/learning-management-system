import { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import Card from './Card';
import { Form } from 'react-router';
import theme from '../styles/theme';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';

interface IUserFilterProps {
  initName: string;
  initRole: string;
  onSubmit: (name?: string, role?: string) => void;
}
const UserFilter = ({ initName, initRole, onSubmit }: IUserFilterProps): ReactElement => {
  const [name, setName] = useState<string>(initName);
  const [role, setRole] = useState<string>(initRole);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(name, role);
  };
  return (
    <Card>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={theme.layout.gap} alignItems="stretch">
          <Grid size={5}>
            <TextField
              label="Namn"
              name="name"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={5}>
            <FormControl fullWidth size="small">
              <InputLabel id="roll-label">Roll</InputLabel>
              <Select
                labelId="role-label"
                id="role-select"
                label="Roll"
                value={role}
                onChange={(e: SelectChangeEvent) => setRole(e.target.value)}
              >
                <MenuItem value="">- Välj -</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={2}>
            <Button type="submit" variant="outlined" fullWidth size="small" sx={{ height: '100%' }}>
              Filtrera
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Card>
  );
};

export default UserFilter;
