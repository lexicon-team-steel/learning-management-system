import { ReactElement } from 'react';
import { Avatar, ListItem, ListItemAvatar, ListItemText, styled, Typography } from '@mui/material';
import EmailLink from './Links/EmailLink';
import { IParticipant } from '../utilities/types';

interface IParticipantItemProps {
  participant: IParticipant;
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
  const firstLetter = participant.firstName.charAt(0);
  const fullName = `${participant.firstName} ${participant.lastName}`;
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
      <StyledListItemText primary={fullName} secondary={emailItem} />
    </StyledListItem>
  );
};

export default ParticipantItem;
