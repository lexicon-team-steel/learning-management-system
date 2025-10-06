import { Box, Button, Typography } from '@mui/material';
import { ReactElement } from 'react';
import theme from '../styles/theme';
import PlusIcon from '@mui/icons-material/Add';

interface IAdminPageTitleProps {
  pageTitle: string;
  subTitle?: string;
  buttonLabel: string;
  buttonDisabled: boolean;
  onButtonClick: () => void;
}

const AdminPageTitle = ({
  pageTitle,
  subTitle,
  buttonLabel,
  buttonDisabled,
  onButtonClick,
}: IAdminPageTitleProps): ReactElement => (
  <>
    <Box display="flex" justifyContent="space-between" alignItems="center" gap={theme.layout.gap}>
      <Typography variant="h1">{pageTitle}</Typography>
      <Button startIcon={<PlusIcon />} variant="contained" disabled={buttonDisabled} onClick={onButtonClick}>
        {buttonLabel}
      </Button>
    </Box>
    {subTitle && <Typography variant="h2">{subTitle}</Typography>}
  </>
);

export default AdminPageTitle;
