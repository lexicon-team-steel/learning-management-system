import { ReactElement } from 'react';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import theme from '../styles/theme';

interface IBackLinkProps {
  name?: string;
}

const BackLink = ({ name }: IBackLinkProps): ReactElement => {
  const navigate = useNavigate();

  return (
    <Link
      component="button"
      onClick={() => navigate(-1)}
      display="flex"
      alignItems="center"
      underline="hover"
      gap={theme.spacing(1)}
    >
      <ArrowBackIcon fontSize="small" /> {name ? `Tillbaka till ${name}` : 'Tillbaka'}
    </Link>
  );
};

export default BackLink;
