import { Box } from '@mui/material';
import Main from '../components/Main';
import CollapsibleList from '../components/CollapsibleList';

import { Await, useLoaderData } from 'react-router';
import { IParticipantLoader, IStudent } from '../utilities/types';
import { Suspense } from 'react';
import ParticipantItem from '../components/ParticipantItem';
import Card from '../components/Card';
import CourseListBoard from '../components/CourseListBoard';

const Sandbox = () => {
  const { participants } = useLoaderData<IParticipantLoader>();

  return <CourseListBoard />;
};

export default Sandbox;
