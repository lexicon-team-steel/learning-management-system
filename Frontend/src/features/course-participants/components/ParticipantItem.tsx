import { ReactElement } from 'react';
import { Participant } from '../types';
import { Avatar, ListItem, ListItemAvatar, ListItemText, styled } from '@mui/material';
import colors from '../../../styles/colors';

interface IParticipantItemProps {
  participant: Participant;
}

const StyledAvatar = styled(Avatar)(() => ({
  backgroundColor: colors.primaryBlue,
}));

const StyledListItem = styled(ListItem)(() => ({
  paddingLeft: 0,
  paddingRight: 0,
}));

const StyledListItemText = styled(ListItemText)({
  '& .MuiListItemText-primary': {
    fontWeight: '500',
  },
  '& .MuiListItemText-secondary': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

const ParticipantItem = ({ participant }: IParticipantItemProps): ReactElement => {
  const firstLetter = participant.fullname.charAt(0);

  return (
    <StyledListItem>
      <ListItemAvatar>
        <StyledAvatar>{firstLetter}</StyledAvatar>
      </ListItemAvatar>
      <StyledListItemText primary={participant.fullname} secondary={participant.email} />
    </StyledListItem>
  );
};

export default ParticipantItem;
