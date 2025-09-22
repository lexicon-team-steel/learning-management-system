import { Box, Container, ContainerProps, styled } from '@mui/material';
import { ReactElement } from 'react';
import Heading from '../Heading';

import CourseBox from './CourseBox';

interface IBoxHorizontalProps {
  title?: string;
  course?: string;
  info?: string;
  dateStart?: string;
  dateEnd?: string;
  component?: 'section' | 'article';
}

const StyledContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  boxSizing: 'border-box',
  width: '100%',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 16,
  boxShadow: theme.shadows[1],
}));

const InnerGridBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));

const BoxHorizontal = ({
  title,
  course,
  info,
  dateStart,
  dateEnd,
  component = 'article',
}: IBoxHorizontalProps): ReactElement => {
  return (
    <StyledContainer component={component}>
      {title && <Heading variant={'h2'} title={title} />}
      <InnerGridBox>
        <CourseBox course={course} info={info} dateStart={dateStart} dateEnd={dateEnd} />
      </InnerGridBox>
    </StyledContainer>
  );
};

export default BoxHorizontal;
