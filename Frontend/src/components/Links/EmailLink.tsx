import { ReactElement } from 'react';
import { Link } from '@mui/material';

interface IEmailLinkProps {
  email: string;
}

const EmailLink = ({ email }: IEmailLinkProps): ReactElement => {
  return (
    <Link href={`mailto:${email}`} variant="text-link">
      {email}
    </Link>
  );
};

export default EmailLink;
