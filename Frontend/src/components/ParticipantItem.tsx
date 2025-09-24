import { ReactElement } from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, styled, Typography } from '@mui/material';
import EmailLink from './Links/EmailLink';
import { IStudent } from '../utilities/types';

interface IParticipantItemProps {
  participant: IStudent;
}

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  paddingLeft: theme.spacing(0),
  paddingRight: theme.spacing(0),
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const ParticipantItem = ({ participant }: IParticipantItemProps): ReactElement => {
  const firstLetter = participant.fullName.charAt(0);
  const emailItem = (
    <Typography noWrap variant="body2">
      <EmailLink email={participant.email} />
    </Typography>
  );

  return (
    <StyledListItem>
      <ListItemAvatar>
        <StyledAvatar>{firstLetter}</StyledAvatar>
      </ListItemAvatar>
      <StyledListItemText primary={participant.fullName} secondary={emailItem} />
    </StyledListItem>
  );
};

export default ParticipantItem;
